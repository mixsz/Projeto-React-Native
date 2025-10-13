import React from 'react';
import { View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

export default class Tela3 extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
         <Card>
          <Card.Title title="Bem vindo"  />
          <Card.Content>
            <Paragraph>{this.props.route.params.usuario}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  }
}
