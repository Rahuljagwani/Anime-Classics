import React from "react";
import { Card, Button } from 'react-bootstrap';
import Modalanime from './Modalanime';




class Fetch extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            animes: [],
            DataisLoaded: false,
            modalShow: false,
            animeid: "2baf70d1-42bb-4437-b551-e5fed5a87abe"
        };
    }

    componentDidMount() {
        fetch(
            "https://ghibliapi.herokuapp.com/films")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    animes: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, animes } = this.state;

        if (!DataisLoaded) return <div>
            <h1 className="heading"> Please wait some time.... </h1> </div>;

        return (
            <>
                <div className="flex-card">
                    {
                        animes.map((item) => (
                            <Card key={item.id} style={{ width: '20rem' }}>
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    {/* <Card.Text>
                            {item.description}
                        </Card.Text> */}
                                    <Button variant="dark" onClick={() => this.setState({ modalShow: true, animeid: item.id })} >More info</Button>
                                </Card.Body>
                            </Card>

                        ))
                    }
                </div>

                <Modalanime
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                    animeid={this.state.animeid}
                />

            </>
        );

    }
}



export default Fetch;
