import React from 'react'
import styles from './index.module.scss'
class Filteroption extends React.Component {
    
    render() {
        const { filterOption,optionClick } = this.props
        console.log(this.props);
        
        return (
            <div>
                 <div>
                    <div className={styles.filter_option}>
                        {
                            filterOption.map(item => 
                            <span key={item.id} onClick={optionClick.bind(this,item)}>
                                {item.title}
                                <i className="iconfont icon-arrow" />
                            </span>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Filteroption