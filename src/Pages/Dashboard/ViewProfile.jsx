import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import profile from '../../resources/images/default.png';
import { FaAlignLeft, FaPencilAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { toast } from 'wc-toast';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Loader from '../../Component/Loader/Loader'; // Import your Loader component

function ViewProfile() {
    const { user, dispatch } = useAuthContext();
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const [btnState, setBtnState] = useState("Validate Changes");
    const [imgPreview, setImgPreview] = useState(null);
    const fileinputRef = useRef(null);
    const [dashUser, setDashUser] = useState(false);
    const [sidemenu, setSideMenu] = useState(false);
    const [shouldMenuSlide, setShouldMenuSlide] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-user`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                });
                setData(response.data);
                setFormData({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    country: response.data.country,
                    state: response.data.state,
                    city: response.data.city,
                    zipcode: response.data.zipcode,
                    address: response.data.address,
                    dob: response.data.dob,
                    phoneNumber: response.data.phoneNumber,
                    email: response.data.email,
                    occupation: response.data.occupation,
                    incomeRange: response.data.incomeRange,
                    pin: response.data.pin,
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUserData();
    }, [user.token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        const objectUrl = URL.createObjectURL(file);
        setImgPreview(objectUrl);
    };

    const handlePencilChange = () => {
        fileinputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtnState("Processing...");

        const formDataToSend = new FormData();
        formDataToSend.append('image', profileImage);
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/update`, formDataToSend, {
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then(() => {
            setBtnState("Validate Changes");
            toast.success("Profile updated successfully.");
        })
        .catch((error) => {
            setBtnState("Validate Changes");
            toast.error(error.response?.data?.error || "An error occurred.");
        });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: null });
    };

    return (
        <div className='dashboard'>
            <div className="dashboard-header">
                <div className="rights-side">
                    <Link to='/' style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>
                        <p>{process.env.REACT_APP_APP_NAME}</p>
                    </Link>
                    <FaAlignLeft onClick={() => {
                        setShouldMenuSlide(true);
                        setSideMenu(!sidemenu);
                    }} />
                </div>
                <div className="left-side">
                    <FaUserAlt onClick={() => {
                        setDashUser(!dashUser);
                    }} />
                </div>
                {dashUser && (
                    <div className="user-menu">
                        <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: ".8rem" }} to={'/user-profile'}>
                            <p>Profile Overview</p>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: '#6e6e6e', marginTop: ".8rem" }} to={'/profile-setting'}>
                            <p>Profile Settings</p>
                        </Link>
                        <p className='logout' onClick={logout}>
                            <FaSignOutAlt />Logout
                        </p>
                    </div>
                )}
            </div>
            <div className="pprofiledetails flip-in-ver-right">
                {sidemenu && (
                    <Sidebar shouldMenuSlide={shouldMenuSlide} />
                )}
                {loading ? ( // Show loader while loading
                    <Loader /> // Replace with your loader component
                ) : (
                    data && (
                        <>
                            <div className="ppdprofile">
                                {/* Profile Image */}
                                {data.profile ? (
                                  <img
                                  src={!imgPreview ? `${process.env.REACT_APP_IMG_BACKEND_URL}/images/${data.profile}` : imgPreview}
                                  alt="profile"
                              />
                                   
                                ) : (
                                  <img src={profile} alt="profile" />
                                )}
                                <div className="edit-profile">
                                    <FaPencilAlt onClick={handlePencilChange} />
                                </div>
                            </div>

                            <h4>Personal Details</h4>
                            <form onSubmit={handleSubmit} className="pddetails">
                                {/* Editable Form Fields */}
                                {Object.entries(formData).map(([key, value]) => (
                                    <div className="ppdetail" key={key}>
                                        <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                                        <input
                                            type={key === 'pin' ? 'password' : 'text'}
                                            name={key}
                                            value={value || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                                <div className="image-profile">
                                    <input
                                        ref={fileinputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                                <button type="submit" className="send-money-send-btn">
                                    {btnState}
                                </button>
                            </form>
                        </>
                    )
                )}
            </div>
        </div>
    );
}

export default ViewProfile;
