import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import {List, Headline, FAB, Button} from 'react-native-paper';
import globalStyles from '../styles/global';
const Inicio = ({navigation}) => {
  const [clientes, setClientes] = useState([]);
  const [consultar, setConsultar] = useState(true);
  useEffect(() => {
    const consultarApi = async () => {
      const {data} = await axios.get(' http://032e67f9b0a7.ngrok.io/clientes');
      setClientes(data);
      setConsultar(false);
    };
    if (consultar) consultarApi();
  }, [consultar]);
  return (
    <View style={globalStyles.contenedor}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('NuevoCliente', {setConsultar})}>
        Nuevo Cliente
      </Button>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? 'Clientes' : 'Aún no hay Clientes'}
      </Headline>
      <FlatList
        data={clientes}
        keyExtractor={(cliente) => cliente.id.toString()}
        renderItem={({item}) => (
          <List.Item
            onPress={() =>
              navigation.navigate('DetallesCliente', {item, setConsultar})
            }
            title={item.nombre}
            description={item.empresa}
          />
        )}
      />
      <FAB
        onPress={() => navigation.navigate('NuevoCliente', {setConsultar})}
        style={globalStyles.fab}
        icon="plus"
      />
    </View>
  );
};

export default Inicio;
