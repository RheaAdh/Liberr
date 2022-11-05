import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import WithGradientPage from './WithGradientPage';
import { widthInPercent } from '../utils/utilities';
import {useAuth} from '../context/AuthProvider';
import ProfileLinks from '../components/ProfileLinks';

export default function Profile({navigation}) {

  const user = useAuth().user;

  return (
    <WithGradientPage navigation={navigation} isProfile={true}>
      <Styled.container>
        {/* <Loading /> */}
        <Styled.stats>
					<div>
						<p style={{letterSpacing: '2px', margin: 0}}>Borrowed</p>
						<h2 style={{ color: '#800CDA', margin: 0 }}>{user.borrowedCount || 0} Books</h2>
					</div>
					<div>
						<p style={{letterSpacing: '2px', margin: 0}}>Lent</p>
						<h2 style={{ color: '#800CDA', margin: 0 }}>{user.toLend?.length || 0} Books</h2>
					</div>
					<div>
						<p style={{letterSpacing: '2px', margin: 0}}>On Shelf</p>
						<h2 style={{ color: '#800CDA', margin: 0 }}>{user.borrowed?.length + user.toLend?.length || 0} Books</h2>
					</div>
				</Styled.stats>
				<Styled.donated>
					<p style={{margin: 0}}>Donated</p>
					<p style={{ margin: 0, background: "rgba(255, 255, 255, 0.32)", color: "#42086F", padding: '5px 10px', borderRadius: 20 }}>{user.donated?.length || 0} books</p>
				</Styled.donated>
        <Styled.linksArea>
          <ProfileLinks text={'View Previously Borrowed'}/>
          <ProfileLinks text={'View Previously Lent'}/>
        </Styled.linksArea>
        <h3 style={{margin: 0, marginTop: '100px', color: '#8C8C8C'}}>MORE</h3>
        <Styled.linksArea>
          <ProfileLinks text={'Frequently Asked Questions'}/>
          <ProfileLinks text={'Terms of Usage'}/>
        </Styled.linksArea>
      </Styled.container>
    </WithGradientPage>
  );
}

const Styled = {
  container: styled(SafeAreaView)`
    flex: 1;
    flex-direction: column;
    padding-top: 50px;
    padding-horizontal: 20px;
  `,
  stats: styled.View`
		width: ${widthInPercent(90)};
		flex-direction: row;
		justify-content: space-between;
	`,
	donated: styled.View`
		flex-direction: row;
		justify-content: space-between;
    align-items: center;
		background: rgba(129, 12, 221, 0.53);
		margin-top: 10px;
    padding: 10px 10px;
		border-radius: 25px;
		color: #FFFFFF
	`,
  linksArea: styled.View`
    margin-top: 10px;
    gap: 4px;
  `
};