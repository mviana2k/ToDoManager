import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyC0YDBjIij4z3yWUD__y5ohayx2KskzI00",
    authDomain: "todomanagermviana.firebaseapp.com",
    databaseURL: "https://todomanagermviana.firebaseio.com",
    projectId: "todomanagermviana",
    storageBucket: "todomanagermviana.appspot.com",
    messagingSenderId: "137314996687"
};

export const initializeFirebaseApi = () => firebase.initializeApp(config);

export const createUserOnFirebaseAsync = async (email, password) => {
    const { user } = await firebase 
        .auth()
        .createUserWithEmailAndPassword(email, password); 
    
    return user;
}

export const signInOnFirebaseAsync = async (email, password) => { 
    const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

    return user; 
}

export const currentFirebaseUser = () => {
    return new Promise((resolve, reject) => {
        var unsubscribe = null;
        unsubscribe = firebase
            .auth()
            .onAuthStateChanged((user) => {
                resolve(user);
            }, (error) => {
                reject(error);
            }, () => {
                unsubscribe();
            });
    });
}

export const writeTaskOnFirebaseAsync = async (task) => {
    const user = await currentFirebaseUser();

    var taskReference = firebase
        .database()
        .ref(user.uid);

    const key = task.key ?
        task.key :
        taskReference
            .child('tasks')
            .push()
            .key;
        
    return await taskReference
        .child(`tasks/${key}`)
        .update(task); 
}

export const readTasksFromFirebaseAsync = async (listener) => {
    const user = await currentFirebaseUser();

    var taskReference = firebase
        .database()
        .ref(user.uid)
        .child('tasks');

    taskReference
        .on('value', (snapshot) => {
            var tasks = [];
            snapshot.forEach(function (element) {
                var task = element.val();
                task.key = element.key;
                tasks.push(task);
            });
            listener(tasks);
        });
}