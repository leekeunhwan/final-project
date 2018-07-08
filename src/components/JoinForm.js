import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import FileBase64 from 'react-file-base64';

export default class JoinForm extends React.Component {
  state = {
    files: [],
    redirect: false,
  };

  componentWillMount() {
    document.body.classList.add('JoinForm__background');
  }

  componentWillUnmount() {
    document.body.classList.remove('JoinForm__background');
  }

  usernameRef = React.createRef();
  passwordRef = React.createRef();

  handleLoginClick = async e => {
    e.preventDefault();
    const { onJoin } = this.props;
    await onJoin(
      this.usernameRef.current.value,
      this.passwordRef.current.value,
      this.state.files
    );
  };

  getFiles(files) {
    this.setState({ files: files });
    console.log(this.state);
  }

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to="/login" />;
    // } else {
    return (
      <Grid columns="equal">
        <Grid.Column />
        <Grid.Column width={5}>
          <span className="copyright">협업이 즐거워지는 Project++</span>
          <Segment className="container" color="blue" textAlign="center">
            <div>
              <div className="column">
                <h2 className="ui white image header">
                  <div className="content">회원가입</div>
                </h2>
                <form className="ui form">
                  <div className="ui stacked segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon" />
                        <input
                          type="text"
                          ref={this.usernameRef}
                          placeholder="계정을 입력해주세요"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon" />
                        <input
                          type="password"
                          ref={this.passwordRef}
                          placeholder="패스워드를 입력해주세요"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="picture icon" />
                        <FileBase64
                          multiple={true}
                          onDone={this.getFiles.bind(this)}
                        />
                      </div>
                    </div>
                    <button
                      onClick={this.handleLoginClick}
                      className="ui fluid large blue submit button"
                    >
                      회원가입 하기
                    </button>
                  </div>
                </form>
                <div className="ui message">
                  계정이 있으신가요? <Link to="/login">로그인하기</Link>
                </div>
              </div>
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column />
      </Grid>
    );
  }
  // }
}
