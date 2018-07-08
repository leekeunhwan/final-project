import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import { UserConsumer } from '../contexts/UserContext';

import {
  Form,
  Grid,
  Segment,
  Icon,
  Image,
  Menu,
  Sidebar,
  Loader,
  Dimmer,
  Container,
} from 'semantic-ui-react';

export default class CreateProjectForm extends React.Component {
  state = { busy: false, tags: [], visible: false };

  componentWillMount() {
    document.body.classList.add('CreateProjectForm__Layout');
  }

  componentWillUnmount() {
    document.body.classList.remove('CreateProjectForm__Layout');
  }

  titleRef = React.createRef();
  bodyRef = React.createRef();

  handleSidebarHide = () =>
    this.setState({
      visible: false,
    });

  handleAnimationChange = animation => () =>
    this.setState({ animation, visible: !this.state.visible });

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition(tag) {
    if (this.state.tags.indexOf(tag) === -1) {
      const tags = [].concat(this.state.tags, tag);
      this.setState({ tags });
    } else {
      alert('중복으로 태깅하셨습니다.');
      return;
    }
  }

  handleInputChange(input) {
    if (!this.state.busy) {
      this.setState({ busy: true });
      return fetch(`query=${input}`).then(result => {
        this.setState({ busy: false });
      });
    }
  }

  handleClick = async e => {
    e.preventDefault();
    const { handleWriteClick } = this.props;
    const postProject = {
      title: this.titleRef.current.value,
      body: this.bodyRef.current.value,
      tags: this.state.tags,
    };
    handleWriteClick(postProject);
  };

  render() {
    const { suggestions } = this.props;
    const { animation, direction, visible } = this.state;
    return (
      <UserConsumer>
        {({ userId, logout, username, userDefaultImage, userImg, loading }) =>
          loading ? (
            <Dimmer active inverted>
              <Loader size="large">Loading</Loader>
            </Dimmer>
          ) : (
            <React.Fragment>
              <Menu
                secondary
                attached="top"
                id="myPage__Menu"
                inverted
                style={{ marginBottom: 0 }}
              >
                <Menu.Item
                  id="myPage__sidebarButton"
                  onClick={this.handleAnimationChange('overlay')}
                  onChange={this.handleDimmedChange}
                >
                  <Icon name="bars" size="large" />
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item as="a">
                    <Icon name="laptop" />
                    {username}님 환영합니다.
                  </Menu.Item>
                </Menu.Menu>
                <Menu.Menu>
                  <Menu.Item as="a" onClick={logout}>
                    <Icon name="log out" />
                    로그아웃
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
              <Sidebar.Pushable
                as={Segment}
                className="myPage__sidebar"
                style={{ marginTop: 0 }}
              >
                <Sidebar
                  id="myPage__sidebar"
                  as={Menu}
                  animation={animation}
                  direction={direction}
                  onHide={this.handleSidebarHide}
                  icon="labeled"
                  vertical
                  visible={visible}
                  width="thin"
                >
                  <Menu.Item as="a" id="menuItem__user">
                    <Image
                      className="sidebar__userImg"
                      src={userImg}
                      size="small"
                      circular
                    />
                    {username}
                  </Menu.Item>
                  <Menu.Item as="a" href="/create-project" id="menuItem">
                    <Icon name="file text" />
                    프로젝트 생성
                  </Menu.Item>
                  <Menu.Item as="a" href="/myPage" id="menuItem">
                    <Icon name="user circle" />
                    마이페이지
                  </Menu.Item>
                  <Menu.Item as="a" id="menuItem" onClick={logout}>
                    <Icon name="log out" />
                    로그아웃
                  </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                  <Segment basic>
                    <React.Fragment style={{ mixBlendMode: 'saturation' }}>
                      <Container
                        style={{
                          padding: '2em 0em 8.5em 0em',
                        }}
                      >
                        <Grid columns="equal">
                          <Grid.Column />
                          <Grid.Column width={8}>
                            <Segment
                              className="container"
                              color="blue"
                              textAlign="center"
                            >
                              <h2 className="ui white image header">
                                <div className="content header">
                                  프로젝트 등록하기
                                </div>
                              </h2>
                            </Segment>
                            <Segment
                              className="container"
                              color="blue"
                              textAlign="left"
                            >
                              <Form>
                                <Form.Field>
                                  <h5 className="ui white image header">
                                    <div className="content">프로젝트 제목</div>
                                  </h5>
                                  <input
                                    type="text"
                                    placeholder="제목을 입력해주세요"
                                    ref={this.titleRef}
                                    required
                                  />
                                </Form.Field>
                                <Form.Field>
                                  <h5 className="ui white image header">
                                    <div className="content">
                                      프로젝트 담당자 설정
                                    </div>
                                  </h5>
                                  <ReactTags
                                    placeholder="담당자를 추가해주세요"
                                    autoresize={false}
                                    tags={this.state.tags}
                                    minQueryLength={1}
                                    suggestions={suggestions}
                                    handleInputChange={this.handleInputChange.bind(
                                      this
                                    )}
                                    handleDelete={this.handleDelete.bind(this)}
                                    handleAddition={this.handleAddition.bind(
                                      this
                                    )}
                                    autofocus={false}
                                  />
                                </Form.Field>

                                <Form.Field>
                                  <h5 className="ui white image header">
                                    <div className="content">프로젝트 내용</div>
                                  </h5>
                                  <textarea
                                    id="CreateProjectForm__Textarea"
                                    rows="21"
                                    placeholder="내용을 입력해주세요"
                                    ref={this.bodyRef}
                                    required
                                  />
                                </Form.Field>
                                <button
                                  className="ui fluid large blue submit button"
                                  onClick={this.handleClick}
                                >
                                  작성하기
                                </button>
                              </Form>
                            </Segment>
                          </Grid.Column>
                          <Grid.Column />
                        </Grid>
                      </Container>
                    </React.Fragment>
                  </Segment>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </React.Fragment>
          )
        }
      </UserConsumer>
    );
  }
}
