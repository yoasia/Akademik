import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
//My components
import BookingComponent from '../components/BookingComponent';

class StudyRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: props.user
        };
    }

    componentWillReceiveProps(nextProps) {
    if(nextProps.user)
        this.setState({user:nextProps.user});
    }

    render() {   
        if(this.state.user)
            return (
            <Grid padded className="padd" textAlign="center"> 
                <Grid.Row key={1}>
                    <Image src='../../assets/img/c2.png' size='small' wrapped />
                </Grid.Row>
                <Grid.Row key={2}>
                    <Header as="h1">Study Room schedule</Header>
                </Grid.Row>
                <BookingComponent user={this.state.user} 
                tablename={"silence_room"} 
                params={{
                    floor:this.state.user.floor,
                    tablename:"silence_room"
                }}>
                </BookingComponent>
            </Grid>
            );
        else
            return null;
    }
}

export default StudyRoom;
