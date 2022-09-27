import { StyledTitle,StyledSubTitle, StyledButton2, ButtonGroup} from "../components/Styles";
//import Logo from "./../assets/logo.png"

const Home = () => {
    return (
        <div>
            <StyledTitle size={65}>
                Bem-Vindo à Plataforma de Gestão
            </StyledTitle>
            <StyledSubTitle size={27}>
                Onde pode gerir a sua applicação Bicicletas Comunitárias
            </StyledSubTitle>
            <ButtonGroup>
                <StyledButton2 to="/login">Entrar</StyledButton2>
            </ButtonGroup>

        </div>
    );
}

export default Home;