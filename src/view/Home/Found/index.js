import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import SearchInput from '../../../components/common/searchInput'
import { connect } from 'react-redux'
import styles from './index.module.scss'
import Filteroption from '../../../components/found/option/Filteroption'
class Found extends React.Component {
    state = {
        filterOption: [
            { id: 1, title: '区域' },
            { id: 2, title: '方式' },
            { id: 3, title: '租金' },
            { id: 4, title: '筛选' },
        ],
        currentId: 0
    }
   
    handleDomContent = () => {
        const { currentId } = this.state
        if (currentId === 1 || currentId === 2 || currentId === 3) {
            return (
                <div>111</div>
            )
        } else if (currentId === 4) {
            return (
                <div>222</div>
            )
        } else {
            return (
                <></>
            )
        }
    }
    render() {
        const { city, history } = this.props
        const { filterOption, currentId } = this.state
        return (
            <div className={styles.found}>
                <NavBar
                    mode="light"
                    icon={<Icon size="md" type="left" />}
                    onLeftClick={() => history.goBack()}

                ><SearchInput city={city} /></NavBar>

                <Filteroption
                    filterOption={filterOption}
                    optionClick={item => this.setState({currentId:item.id})}
                />


                {
                    !!currentId && <div>
                        <div className={styles.filter_content}>
                            {this.handleDomContent()}
                        </div><div className={styles.filter_btn}>
                            <div>取消</div>
                            <div>确定</div>
                        </div>
                    </div>
                }

            </div>
        );
    }
}
const mapStateToProps = state => ({
    city: state.city.citylist.city
})

export default connect(mapStateToProps)(Found);