import React, { Fragment, useState, useEffect } from 'react';
import "./RegisterLogin.css";
import { clearErrors, register } from '../../actions/userAction';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom";
import { toast } from 'react-toastify';
import { verifyPhone } from '../../firebase';

const Register = () => {

    const sendOtp = async (e) => {
        e.preventDefault();
        if(phone.trim==="" || phone===undefined || phone.length!==10){
            return toast.error("Enter a proper phone number");
        }
        else{
            try {
                const response = await verifyPhone("+91"+phone);
                setOtpObj(response);
                setOtpButton(true);
                setSendOtpBut(false);
                console.log(response);
            } catch (error) {
                toast.error("Not able to send otp. Please reload the page and try again.");
                console.log(error);
            }
        }
        
    };
    

    const verifyOtp = async (e) => {
        e.preventDefault();

        if(otp.trim()==="" || otp==null){
            return toast.error("Fill the OTP field properly OTP");
        }
        try{
            await otpObj.confirm(otp);
            setVerify(true);
            setOtpButton(false);
            toast.success("OTP verified successfully")
        }catch(err){
            toast.error("Wrong OTP");
        }
    }

    const navigate = useNavigate();
    const { state } = useLocation();
    const { displayName, userEmail } = state;
    const dispatch = useDispatch();

    const { error, isAuthenticated } = useSelector((state) => state.user);
    // console.log(error);

    const options =["#c1946a","#FFFF00","#00FF00","#00FFFF","#FF00FF","#FF0000"];
    const[otpObj, setOtpObj] = useState("");
    // console.log(otpObj);
    const[verify,setVerify]=useState(false);
    const[otpButton, setOtpButton]=useState(false);
    const[sendOtpBut,setSendOtpBut]=useState(true);
    const [user, setUser] = useState({
        getName: displayName,
        userName: "",
        email: userEmail,
        phone: "",
        otp: "",
        avatar: options[Math.floor(Math.random() * options.length)],
    });

    const { getName, userName, email, avatar, phone, otp} = user;    

    const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();

        if(userName.trim()===""){
            return toast.error("Enter a valid User Name")
        }
        else{
            myForm.set("getName", getName);
            myForm.set("email", email);
            myForm.set("userName", userName);
            myForm.set("avatar", avatar);
            myForm.set("phoneNumber", phone);
            dispatch(register(myForm));
        }
        
    };
    useEffect(() => {
        if(error){
            toast.error(error); 
            dispatch(clearErrors());
        }

        if(isAuthenticated) {
            navigate("/profile");
        }
    },[dispatch, error, navigate, isAuthenticated]);

    return (
        <Fragment>
            <div className='register_form'>
            <div className='register_heading'>
                <h2>
                    <span style={{color:"orange"}}>Welcome</span>
                    <span style={{color:"orange"}}> to</span> 
                    <span style={{color:"orange", textDecoration:"underline"}}> Social-Epics</span>
                </h2>
            </div>
            <form
                className="signUpForm"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
            >
                <div className='register_form_input'>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        disabled
                        value={email}
                        onChange={registerDataChange}
                    />
                </div>
                <div className='register_form_input'>
                    <input
                        type="text"
                        placeholder="*Anonymous User Name"
                        required
                        autoComplete='off'
                        name="userName"
                        value={userName}
                        onChange={registerDataChange}
                    />
                </div>
                <div className='register_form_otp'>
                    <input
                        placeholder="*Phone Number"
                        required
                        autoComplete='off'
                        name="phone"
                        value={phone}
                        maxLength="10"
                        minLength="10"
                        // onChange={(e) => setPhone(e.target.value)}
                        onChange={registerDataChange}
                    />
                    <button
                        className={sendOtpBut ? "otpButtonAble" : "otpButtonDisable"}
                        disabled={!sendOtpBut}
                        onClick={sendOtp}>Send OTP</button>
                </div>
                <div id="sign-in-phone-number"/>
                <div className='register_form_otp'>
                    <input
                        placeholder="Enter the OTP"
                        required
                        autoComplete='off'
                        name="otp"
                        value={otp}
                        // onChange={(e) => setOtp(e.target.value)}
                        onChange={registerDataChange}
                    />
                    <button 
                        disabled={!otpButton}
                        className={otpButton ? "otpButtonAble" : "otpButtonDisable"}
                        onClick={verifyOtp}> Verify OTP
                    </button>
                </div>
                <input
                    disabled={!verify}
                    type="submit" value="Register" className={verify ? "registerAble" : "registerDisable"} />
            </form>
            </div>
            
        </Fragment>
    );
};

export default Register;
