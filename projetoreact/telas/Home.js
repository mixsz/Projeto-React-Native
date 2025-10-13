import React from 'react';
import { View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perfil: this.props.route.params.perfil
    };
  }

  render() {
    
    return (
      <View >
         <Card>
          <Card.Title title="Bem vindo"/>
          <Card.Content>
            <Paragraph>{this.state.perfil.usuario}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}
