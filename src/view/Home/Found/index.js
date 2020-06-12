import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import SearchInput from '../../../components/common/searchInput'
import { connect } from 'react-redux'
import styles from './index.module.scss'
class Found extends React.Component {
    state = {  }
    render() { 
        const { city,history } = this.props
        return ( 
            <div className={styles.found}>
                <NavBar
                    mode="light"
                    icon={<Icon size="md" type="left" />}
                    onLeftClick={() => history.goBack()}
                    
                ><SearchInput city={city}/></NavBar>
            </div>
         );
    }
}
const mapStateToProps = state => ({
    city:state.city.citylist.city
})
 
export default connect(mapStateToProps)(Found);