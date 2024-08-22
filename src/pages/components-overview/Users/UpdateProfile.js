import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Col, Row, Button } from 'antd';
import { Button as Btn, Chip } from '../../../../node_modules/@mui/material/index';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { Form, Input } from 'antd';
// import { USER_DATA, REFRESH_TOKEN, API_BASE_URL } from '../../../constants/constants';
import { USER_DATA } from '../../../constants/constants';
import avatar1 from 'assets/images/users/avatar-1.png';
import { ReactComponent as Disposed } from 'assets/images/icons/trash-g.svg';
import { ReactComponent as Camera } from 'assets/images/icons/camara.svg';
import { toast } from 'react-toastify';
import { ProfileUpdate, ProfileData } from 'components/redux/User/action';
// import { ProfileUpdate, ProfileData, RefreshToken } from 'components/redux/User/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../routes/AuthContext';

export default function UpdateProfile() {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [IsDisabled, setIsDisabled] = React.useState(true);
	const [IsRequired, setIsRequired] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [loadings, setLoadings] = React.useState(false);
	const [file, setFile] = React.useState(null);
	const profile = useSelector((state) => state.UserProfileData && state.UserProfileData.UserDetails);
	const [image, setImage] = React.useState(profile.pictureWithPath || avatar1);
	React.useEffect(() => {
		dispatch(ProfileData(USER_DATA.id));
	}, [dispatch]);

	React.useEffect(() => {
		if (profile) {
			form.setFieldsValue({
				fullName: profile.fullName || '',
				email: profile.email || '',
				role: profile?.role || '',
				plant: profile.plant || ''
			});
			if (profile?.pictureWithPath) {
				setImage(profile.pictureWithPath);
			} else {
				setImage(avatar1);
			}
		}
	}, [form, profile]);
	const onFinish = () => {
		setLoadings(true);
		const formValues = form.getFieldsValue(true);
		const updatedValues = {
			...formValues,
			id: profile.id
		};
		if (file) {
			updatedValues.file = file;
		}
		dispatch(ProfileUpdate(updatedValues))
			.then((response) => {
				if (response.status == '201') {
					toast.success('Updated SuccessFully');
					setLoadings(false);
					dispatch(ProfileData(USER_DATA.id));
					// const token = REFRESH_TOKEN.replace(/"/g, '');
					// console.log(token);
					// const formData = new FormData();
					// formData.append('token', token);
					// dispatch(RefreshToken(token));
					form.setFieldsValue({
						fullName: profile.fullName || '',
						email: profile.email || '',
						role: profile?.role || '',
						plant: profile.plant || ''
					});
					setImage(profile.pictureWithPath);
					setIsRequired(false);
					window.location.reload();
				} else {
					toast.error('Failed to update profile..........');
					setLoadings(false);
				}
			})
			.catch((error) => {
				toast.error(error.response.data.message);
				setLoadings(false);
			});
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			setErrorMessage('Please select an image file.');
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			setErrorMessage('Please select an image file smaller than 2MB.');
			return;
		}
		setFile(file);
		const reader = new FileReader();
		reader.onload = () => setImage(reader.result);
		reader.readAsDataURL(file);
		setErrorMessage('');
	};

	const handleLogout = async () => {
		try {
			const response = await logout();
			if (response.status === 200) {
				navigate('/');
			}
		} catch (error) {
			toast.error('Unable Logout', error);
		}
	};

	const handleResetImage = () => {
		setImage((profile ? profile.pictureWithPath : '') || avatar1);
	};

	const enablereadonly = () => {
		setIsDisabled(false);
		setIsRequired(true);
	};

	const disablereadonly = () => {
		setIsDisabled(true);
		setIsRequired(false);
	};

	const VisuallyHiddenInput = styled('input')({
		clip: 'rect(0 0 0 0)',
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		whiteSpace: 'nowrap',
		width: 1
	});
	return (
		<Box sx={{ width: '100%' }}>
			<Box className="box-profile">
				<Form form={form} className="profile-form" encType="multipart/form-data" onFinish={onFinish}>
					<Row>
						<Col span={8}></Col>
						<Col span={8}></Col>
						<Col span={8} className="mui-text-right">
							{!IsRequired && (
								<>
									<Btn className="btn-profile-default" onClick={enablereadonly}>
										<EditIcon fontSize="small" /> Edit
									</Btn>
									<Btn className="btn-profile-default" onClick={handleLogout}>
										<LogoutIcon fontSize="small" /> Logout
									</Btn>
								</>
							)}
							{IsRequired && (
								<>
									<Btn className="btn-profile-cancel" onClick={disablereadonly}>
										Cancel
									</Btn>
									<Button className="btn-profile-submit" type="primary" htmlType="submit" loading={loadings}>
										Save Changes
									</Button>
								</>
							)}
						</Col>
					</Row>
					<Row>
						<Col span={24} className="mui-text-center">
							<div className="profile-box-img">
								<div className="box-profile-preview">
									<img
										alt="profile user"
										src={image || avatar1} // If image is null, show a default avatar (assuming avatar1 is a variable holding the default avatar image URL)
										className="img-rounded"
									/>
								</div>
								<div className="profile-edit-box-shadow">
									<Form.Item name="picture">
										<Btn
											component="label"
											className="upload-profile-input"
											role={undefined}
											variant="contained"
											tabIndex={-1}
											startIcon={<Camera />}
											disabled={IsDisabled}
										>
											<VisuallyHiddenInput
												type="file"
												name="picture"
												disabled={IsDisabled}
												onChange={handleFileChange}
											/>
										</Btn>
										<Chip
											className="bg-none"
											icon={<Disposed />}
											label={false}
											onClick={handleResetImage}
											disabled={IsDisabled}
										/>
									</Form.Item>
								</div>
							</div>
						</Col>
						<Col span={24} className="mui-text-center">
							{errorMessage && <span className="error-message">{errorMessage}</span>}
						</Col>
						<Col span={24}>
							<h4>Personal Information</h4>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col span={6}>
							<Form.Item
								label="  Name"
								name="fullName"
								labelAlign="top"
								labelCol={{ span: 24 }}
								rules={[{ required: IsRequired, message: 'This field is required' }]}
							>
								<Input placeholder="Enter Name" style={{ height: '40px' }} readOnly={IsDisabled} />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label="  Email"
								name="email"
								labelAlign="top"
								labelCol={{ span: 24 }}
								rules={[
									{ required: IsRequired, message: 'This field is required' },
									{ type: 'email', message: 'Please enter a valid email address.' }
								]}
							>
								<Input type="email" placeholder="Enter email" style={{ height: '40px' }} readOnly={true} />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label="  Designation"
								name="role"
								labelAlign="top"
								labelCol={{ span: 24 }}
								rules={[{ required: IsRequired, message: 'This field is required' }]}
							>
								<Input placeholder="Enter Designation" style={{ height: '40px' }} readOnly={true} />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label="  Plant"
								name="plant"
								labelAlign="top"
								labelCol={{ span: 24 }}
								rules={[{ required: IsRequired, message: 'This field is required' }]}
							>
								<Input placeholder="Enter plant" style={{ height: '40px' }} readOnly={true} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Box>
		</Box>
	);
}
