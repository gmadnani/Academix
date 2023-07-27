import React from "react";
import { connect } from "react-redux";
import { Grid, Segment, List , Header, Button,  } from 'semantic-ui-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {useHistory} from 'react-router-dom';
import { Autoplay } from 'swiper/modules';

const Home = (props) => {
  const history = useHistory();
  console.log(props)
  const messages = [
    {message: 'Message 1'},
    {message: 'Message 2'},
    {message: 'Message 3'},
    // etc
  ];
  const slides = [
    {
      header: 'Slide 1',
      description: 'Description for slide 1',
      image: 'https://www.bu.edu/chiefhealthoffice/files/2023/05/22-1623-AERIAL-248-1-3000x1248.jpg'
    },
    {
      header: 'Slide 2',
      description: 'Description for slide 2',
      image: 'https://www.bu.edu/chiefhealthoffice/files/2023/05/21-1509-CAMPUS-211-1-3000x1248.jpg'
    },
    {
      header: 'Slide 3',
      description: 'Description for slide 3',
      image: 'https://www.bu.edu/summer/files/2021/11/about-bu-2022-hero-1500x624.jpg'
    },
    {
      header: 'Slide 4',
      description: 'Description for slide 4',
      image: 'https://www.bu.edu/summer/files/2021/11/faq-2022-hero-1500x624.jpg',

    }
  ];
  const { token, role } = props;
  if (token) {
  }
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
        }}
        style={{
          height: '600px'
      }}>
        {slides.map((slide, index) => (
          <SwiperSlide style={{height: '100%'}} key={index}>
            <Segment style={{height: '100%'}} inverted color='teal'>
              <img alt={''} src={slide.image} width={'100%'}/>
            </Segment>
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{padding: '30px'}}>
        <Grid columns={2}>
          <Grid.Column width={5}>
            <Header as='h3' textAlign='center'>Updates</Header>
            <Segment>
              <div style={{height: 300, overflowY: 'scroll'}}>
                {messages.map(m => (
                  <p key={m.message}>{m.message}</p>
                ))}
              </div>
            </Segment>
          </Grid.Column>

          <Grid.Column width={11}>
            <Header as='h3' textAlign='center'>Campus Resources</Header>
            <Segment>
              <List>
                <List.Item>
                  <Button
                    onClick={() => {
                      history.push('zoom-dashboard')
                    }}
                    fluid basic color={'teal'}>
                    Zoom Dashboard
                  </Button>
                </List.Item>
                {role === 'student' && (
                  <List.Item>
                    <Button
                      onClick={() => {
                        history.push('student')
                      }}
                      fluid basic color={'teal'}>
                      Student link
                    </Button>
                  </List.Item>
                )}
                {role === 'teacher' && (
                  <List.Item>
                    <Button
                      onClick={() => {
                        history.push('facuity')
                      }}
                      fluid basic color={'teal'}>
                      Facuity link
                    </Button>
                  </List.Item>
                )}
                <List.Item>
                  <Button
                    onClick={() => {
                      history.push('calendar')
                    }}
                    fluid basic color={'teal'}>
                    BU Calendar
                  </Button>
                </List.Item>
                <List.Item>
                  <Button
                    onClick={() => {
                      history.push('profile')
                    }}
                    fluid basic color={'teal'}>
                    Profile
                  </Button>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    role: state.auth.role
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);