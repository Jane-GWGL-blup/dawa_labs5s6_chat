import { useState, useEffect } from "react";
import { ModalRegister, DrawerList } from "../../components";
import { get } from "../../service";
import HeaderLayout from "../../layout"
//Add pusher
import Pusher from "pusher-js";

const Chat = () => {
    const [ users, setUsers ] = useState([]);

    const fetchUsers = async () => {
        //
        const { id } = JSON.parse(localStorage.getItem("user"));
        const response = await get(`/user/${id}`);
        //
        console.log(response);
        setUsers(response.data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const pusher = new Pusher("5969aa217286ec27006e", {
            cluster: "us2",
        });

        const channel = pusher.subscribe("my-chat");
        channel.bind("my-list-contacts", async ({ message }) => {
            console.log("message from pusher", message);
        })
    }, []);

    return (
        <div>
            <HeaderLayout>
                {users.length > 0 && <DrawerList users={users} />}
                <ModalRegister fetchUsers={fetchUsers} />
            </HeaderLayout>
        </div>
    )
}

export default Chat;
