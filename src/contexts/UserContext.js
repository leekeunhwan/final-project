import React from 'react';
import pmAPI from '../pmAPI';
import { Redirect } from 'react-router-dom';

const { Provider, Consumer } = React.createContext();

class UserProvider extends React.Component {
  state = {
    loading: true,
    userId: null,
    username: null,
    userImg: null,
    userDefaultImage:
      'data:image/png;base64,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',
    redirect: false,
  };
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.fetchMe();
    }
  }
  fetchMe = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.get('/me');
      if (res.data.userImg != null) {
        this.setState({
          userId: res.data.id,
          username: res.data.username,
          userImg: res.data.userImg[0].base64,
        });
      } else {
        this.setState({
          userId: res.data.id,
          username: res.data.username,
        });
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  join = async (username, password, userImg) => {
    this.setState({
      loading: true,
    });

    try {
      if (userImg[0].username === undefined) {
        await pmAPI.post('users/register', {
          username: username,
          password: password,
          userImg: userImg,
        });
      } else {
        await pmAPI.post('users/register', {
          username: username,
          password: password,
          userImg: [
            {
              base64:
                'data:image/png;base64,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',
            },
          ],
        });
      }
      alert('회원가입을 축하드립니다.');
      window.location.replace('/login');
    } catch (e) {
      if (e.response) {
        if (e.response.status >= 500) {
          alert('서버에 이상이 생겼습니다. 잠시 후에 다시 시도부탁드립니다.');
        } else if (e.response.status === 400) {
          alert('아이디가 중복되었습니다. 다시 입력부탁드립니다.');
        }
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  login = async (username, password) => {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.post('/users/login', {
        username: username,
        password: password,
      });
      localStorage.setItem('token', res.data.token);
      this.fetchMe();
      alert(`${username}님 환영합니다.`);
      window.location.replace('/myPage');
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  logout = () => {
    localStorage.removeItem('token');
    alert('로그아웃이 정상적으로 완료되었습니다.');
    window.location.replace('/');
  };

  render() {
    const value = {
      join: this.join,
      login: this.login,
      logout: this.logout, // 이 부분 수정하였습니다.
      username: this.state.username,
      userImg: this.state.userImg,
      userDefaultImage: this.state.userDefaultImage,
      userId: this.state.userId,
      loading: this.state.loading,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
