import * as React from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerDenuncia from './screens/denuncias/VerDenuncia';
import Login from './screens/sesion/Login';
import HomeScreen from './screens/sesion/HomeScreen';
import MenuReclamos from './screens/reclamos/MenuReclamos';
import MenuDenuncias from './screens/denuncias/MenuDenuncias';
import MenuPromociones from './screens/promociones/MenuPromociones';
import NuevoReclamo from './screens/reclamos/NuevoReclamo';
import BuscarReclamo from './screens/reclamos/BuscarReclamo';
import ResultadosReclamos from './screens/reclamos/ResultadosReclamos';
import NuevaDenuncia from './screens/denuncias/NuevaDenuncia';
import BuscarDenuncia from './screens/denuncias/BuscarDenuncia';
import NuevaPromocion from './screens/promociones/NuevaPromocion';
import BuscarPromocion from './screens/promociones/BuscarPromocion';
import Registrarse from './screens/sesion/Registrarse';
import { COLORS } from './styles/Theme';
import getUsuario from './databases/usuarios.json';
import * as SesionDB from './databases/SesionDB';
import { StatusBar } from 'expo-status-bar';
import ResultadosDenuncia from './screens/denuncias/ResultadosDenuncia';
import VerReclamo from './screens/reclamos/VerReclamo';
import ResultadosPromociones from './screens/promociones/ResultadosPromociones';
import VerPromocion from './screens/promociones/VerPromocion';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login" screenOptions={{
				headerStyle: styles.header,
				headerTintColor: COLORS.WHITE,
				statusBarStyle: COLORS.WHITE
			}}>
				<Stack.Screen name="Login" component={Login} options={{ title: "Iniciar Sesion" }}  />
				<Stack.Screen name="Registrarse" component={Registrarse} options={{ title: "Registrarse" }} />
				<Stack.Screen name="Home" component={HomeScreen} options={{ title: "Bienvenido!" }} />
				<Stack.Screen name="MenuReclamos" component={MenuReclamos} options={{ title: "Reclamos" }} />
				<Stack.Screen name="MenuDenuncias" component={MenuDenuncias} options={{ title: "Denuncias" }} />
				<Stack.Screen name="MenuPromociones" component={MenuPromociones} options={{ title: "Promociones" }} />
				<Stack.Screen name="NuevoReclamo" component={NuevoReclamo} options={{ title: "Generar Reclamo" }} />
				<Stack.Screen name="BuscarReclamo" component={BuscarReclamo} options={{ title: "Buscar Reclamos" }} />
				<Stack.Screen name="ResultadosReclamos" component={ResultadosReclamos} options={{ title: "Resultados" }} />
				<Stack.Screen name="VerReclamo" component={VerReclamo} options={{ title: "Reclamo" }} />
				<Stack.Screen name="NuevaDenuncia" component={NuevaDenuncia} options={{ title: "Realizar una Denuncia" }} />
				<Stack.Screen name="BuscarDenuncia" component={BuscarDenuncia} options={{ title: "Buscar Denuncias" }} />
				<Stack.Screen name="ResultadosDenuncia" component={ResultadosDenuncia} options={{ title: "Resultados" }} />
				<Stack.Screen name="VerDenuncia" component={VerDenuncia} options={{ title: "Denuncia" }} />
				<Stack.Screen name="NuevaPromocion" component={NuevaPromocion} options={{ title: "Publicar Promocion" }} />
				<Stack.Screen name="BuscarPromocion" component={BuscarPromocion} options={{ title: "Buscar Promociones" }} />
				<Stack.Screen name="ResultadosPromociones" component={ResultadosPromociones} options={{ title: "Resultados" }} />
				<Stack.Screen name="VerPromocion" component={VerPromocion} options={{ title: "Promocion" }} />
			</Stack.Navigator>
		</NavigationContainer >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		backgroundColor: COLORS.DARKBLUE,
		color: COLORS.WHITE
	}
});


