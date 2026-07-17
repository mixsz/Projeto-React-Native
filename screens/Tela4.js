import * as React from 'react';
import { TextInput, Text, View, Button } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

export default class Tela4 extends React.Component {
    render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
         <Card>
          <Card.Title title="Bem vindo"  />
          <Card.Content>
          </Card.Content>
        </Card>
      </View>
    );
  }
}