import * as React from 'react'
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/common/Button';
import Notification from 'antd/es/notification';

import Network from '../../../services/index';

import validateEmail from '../../../helpers/validateEmail';

import './SignIn.scss';

export default function SignIn() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      setLoading(true);
      event.preventDefault();
      if (!validateEmail) {
        setEmailValid(true);
        return;
      }
      const response = await Network.signIn(email) as {
        success: boolean,
        message: string
      };
      if (response.success) {
        // push to verify
        Notification.open({
          message: 'Success',
          description:
            response.message
        });
        navigate('/verify-code');
      } else {
        // show error message
        Notification.open({
          message: 'Error',
          description:
            'Sign In failed'
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Notification.open({
        message: 'Error',
        description:
          'Something Went wrong please try again later'
      });
      setLoading(false);
    }
  }
  return (
    <div className='signin-container'>
      <div className='form-container'>
        <div className='image-container'>
          <img src='https://avatars.githubusercontent.com/u/68122202?s=400&u=4abc9827a8ca8b9c19b06b9c5c7643c87da51e10&v=4' className='image' alt="Ultimate News" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input className={`form-control ${emailValid ? 'is-invalid' : ''}`} type='email' placeholder='Enter Email' value={email} onChange={(val) => setEmail(val.target.value)} />
            {emailValid && (
              <small id="passwordHelpInline" className="invalid-feedback">
                Email entered is not valid
              </small>
            )}
          </div>
          <div className='form-group'>
            <Button type='submit' design='primary long' disabled={!email} >
              { loading ? 'LOADING ...': 'SUBMIT' }
            </Button>
          </div>
        </form>
        <div className='link-container'>
          <a href='/verify-code'>Verify Code</a>
        </div>
      </div>
    </div>
  )
}
