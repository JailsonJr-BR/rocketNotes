import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from "./styles";
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import avatarPlaceHolder from '../../assets/placeholder.png';

export function Header(){
    const { signOut, user } = useAuth();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;


    return(
        <Container>
            <Profile to="/profile">
                <img 
                src={avatarUrl} 
                alt="Foto do usuário" 
                />

                <div>
                    <span>Bem-vindo,</span>
                    <strong>
                        {user.name}
                    </strong>
                </div>
            </Profile>

            <Logout onClick={signOut}> 
                <RiShutDownLine />
            </Logout>

        </Container>
    )
}