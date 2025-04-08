import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/usercontext';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './profile.css';

const Profile = () => {
  const { userData, updateUserData } = useContext(UserContext);
  const auth = getAuth();
  const storage = getStorage();

  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [hasPendingUpdate, setHasPendingUpdate] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    address: '',
    bio: '',
    profileImage: '',
    previewImage: ''
  });

  const initializeProfile = (data) => {
    setProfile({
      name: data.displayName || '',
      email: data.email || '',
      phone: data.phone || '',
      organization: data.organization || '',
      position: data.position || '',
      address: data.address || '',
      bio: data.bio || '',
      profileImage: data.photoURL || 'https://randomuser.me/api/portraits/men/32.jpg',
      previewImage: data.photoURL || 'https://randomuser.me/api/portraits/men/32.jpg'
    });
  };

  useEffect(() => {
    if (userData) {
      initializeProfile(userData);
    }
  }, [userData]);

  useEffect(() => {
    const pendingUpdate = localStorage.getItem('pendingProfileUpdate');
    setHasPendingUpdate(!!pendingUpdate);
  }, []);

  const checkNetworkStatus = () => {
    if (!navigator.onLine) {
      setError('No internet connection. Please check your network.');
      return false;
    }
    return true;
  };

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `profile_images/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    if (!checkNetworkStatus()) return;

    setIsSaving(true);
    setError(null);

    try {
      let photoURL = profile.profileImage;

      if (
        profile.previewImage !== userData.photoURL &&
        profile.profileImage instanceof File
      ) {
        photoURL = await uploadImage(profile.profileImage);
      }

      // Update Firebase Auth displayName & photoURL
      await updateProfile(auth.currentUser, {
        displayName: profile.name,
        photoURL
      });

      // Update local user context
      updateUserData({
        displayName: profile.name,
        photoURL,
        email: profile.email,
        phone: profile.phone,
        organization: profile.organization,
        position: profile.position,
        address: profile.address,
        bio: profile.bio
      });

      localStorage.removeItem('pendingProfileUpdate');
      setHasPendingUpdate(false);
      setEditMode(false);
    } catch (err) {
      console.error('Update error:', err);
      setError(`Failed to update profile: ${err.message}`);

      if (err.code === 'auth/network-request-failed') {
        localStorage.setItem(
          'pendingProfileUpdate',
          JSON.stringify({ ...profile, timestamp: new Date().toISOString() })
        );
        setHasPendingUpdate(true);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    initializeProfile(userData);
    setEditMode(false);
    setError(null);
  };

  const retryPendingUpdate = () => {
    const pendingUpdate = localStorage.getItem('pendingProfileUpdate');
    if (pendingUpdate) {
      try {
        const parsed = JSON.parse(pendingUpdate);
        setProfile({
          ...parsed,
          previewImage: parsed.profileImage
        });
        setEditMode(true);
        localStorage.removeItem('pendingProfileUpdate');
        setHasPendingUpdate(false);
      } catch (err) {
        console.error('Failed to load pending update:', err);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          profileImage: file,
          previewImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Vendor Profile</h1>
        {hasPendingUpdate && (
          <button className="pending-update-btn" onClick={retryPendingUpdate}>
            Pending Update Available
          </button>
        )}
        <button
          className={editMode ? 'save-btn' : 'edit-btn'}
          onClick={editMode ? handleSave : () => setEditMode(true)}
          disabled={isSaving}
        >
          {editMode ? (isSaving ? 'Saving...' : 'Save Profile') : 'Edit Profile'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          {error.includes('network') && (
            <button
              onClick={handleSave}
              className="retry-btn"
              disabled={isSaving}
            >
              Retry Now
            </button>
          )}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-image-section">
          <div className="image-container">
            <img src={profile.previewImage} alt="Profile" className="profile-image" />
            {editMode && (
              <div className="image-upload-overlay">
                <label htmlFor="profile-image-upload" className="upload-label">
                  📷 <span>Change Photo</span>
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </div>
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-position">{profile.position}</p>
        </div>

        <div className="profile-details">
          {/* Personal Info */}
          <div className="detail-section">
            <h3 className="section-title">Personal Information</h3>
            {[
              { label: 'Full Name', name: 'name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email', disabled: true },
              { label: 'Phone', name: 'phone', type: 'tel' }
            ].map((field) => (
              <div className="detail-row" key={field.name}>
                <span className="detail-label">{field.label}</span>
                {editMode ? (
                  <input
                    type={field.type}
                    name={field.name}
                    value={profile[field.name]}
                    onChange={handleInputChange}
                    className="detail-input"
                    disabled={field.disabled}
                  />
                ) : (
                  <span className="detail-value">
                    {profile[field.name] || 'Not provided'}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Organization Info */}
          <div className="detail-section">
            <h3 className="section-title">Organization Details</h3>
            {[
              { label: 'Organization', name: 'organization' },
              { label: 'Position', name: 'position' },
              {
                label: 'Address',
                name: 'address',
                textarea: true,
                rows: 3
              }
            ].map((field) => (
              <div className="detail-row" key={field.name}>
                <span className="detail-label">{field.label}</span>
                {editMode ? (
                  field.textarea ? (
                    <textarea
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleInputChange}
                      className="detail-textarea"
                      rows={field.rows}
                    />
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleInputChange}
                      className="detail-input"
                    />
                  )
                ) : (
                  <span className="detail-value">
                    {profile[field.name] || 'Not provided'}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="detail-section">
            <h3 className="section-title">About</h3>
            {editMode ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                className="detail-textarea bio-textarea"
                rows="5"
              />
            ) : (
              <p className="profile-bio">{profile.bio || 'No bio provided'}</p>
            )}
          </div>
        </div>
      </div>

      {editMode && (
        <div className="action-buttons">
          <button className="cancel-btn" onClick={handleCancel} disabled={isSaving}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
