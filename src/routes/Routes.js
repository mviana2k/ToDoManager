import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { App, Login, Register, ToDoTasks, DoneTasks, Task } from '../screens/Screens';
import { Platform } from 'react-native';

const taskListTabNavigator = createBottomTabNavigator ({
    pageTodoTasks: { screen: ToDoTasks, title: 'To Do' },
    pageDoneTasks: { screen: DoneTasks, title: 'Done' }
});

export default Routes = createAppContainer(createStackNavigator(
    {
        pageApp: { screen: App },
        pageLogin: { screen: Login },
        pageRegister: { screen: Register },
        pageTasksList: {
            screen: taskListTabNavigator,
            navigationOptions: {
                title: 'Task List'
            }
        },
        pageTask: { screen: Task }  
    }, 
    {
        headerMode: 'screen'
    }
));