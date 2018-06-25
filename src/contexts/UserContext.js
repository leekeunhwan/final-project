import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();
class UserProvider extends React.Component {
  state = {
    loading: false,
    userId: null,
    username: null,
  };

  fetchMe = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.get('/me');
      this.setState({
        userId: res.data.id,
        username: res.data.username,
      });
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
      console.log('로그인됨');
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  logout = () => {
    localStorage.removeItem('token');
  };

  render() {
    const value = {
      login: this.login,
      logout: this.logout,
      // 이 부분 수정하였습니다.
      username: this.state.username,
      userId: this.state.userId,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
