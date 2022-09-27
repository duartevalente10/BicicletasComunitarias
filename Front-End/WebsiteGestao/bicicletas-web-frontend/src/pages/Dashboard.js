import { StyledTitle, StyledSubTitle, StyledButton2, ButtonGroup, StyledFormArea, colors, ExtraText} from "../components/Styles";
import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userActions";
import { useHistory } from 'react-router-dom';


const Dashboard = ({logoutUser, user}) => {

    const navigate = useHistory();

    return (
        <div>
            <StyledFormArea bg={colors.light2}>
                <StyledTitle size={65}>
                    Bem-Vindo
                </StyledTitle>
                <StyledSubTitle size={27}>
                    {user.name}
                </StyledSubTitle>
                <ExtraText color={colors.light1light2}>{user.email}</ExtraText>
                <ExtraText color={colors.light1light2}>{new Date(user.dateOfBirth).toLocaleDateString()}</ExtraText>
                <ButtonGroup>
                    <StyledButton2 to="#" onClick={() => logoutUser(navigate)}>Sair</StyledButton2>
                </ButtonGroup>
            </StyledFormArea>
        </div>
    );
}

const mapStateToProps = ({session}) => ({
    user: session.user
})

export default connect(mapStateToProps, {logoutUser})(Dashboard);