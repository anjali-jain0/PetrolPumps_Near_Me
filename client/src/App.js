import React from 'react';

class PetrolPump extends React.Component {
    
    constructor(){
        super();
        this.state={
            lat:'',
            long:'',
            pumps:''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {lat , long} = this.state;
        fetch('/petrolpump/' + lat + '/' + long)
        .then(res => res.json())
        .then(data => this.setState({pumps:data}))
        .catch(err => console.log(err));
    }

  render() {
    
    const pumps = this.state.pumps;
    console.log(pumps);
    return (
        <div>
            <form id="search" onSubmit={this.handleSubmit}>
                Enter your latitude: <br />
                <input type="text" name='lat' placeholder='Mention latutitude here' onChange = {this.handleChange} /><br/> <br/>
                Enter your longitude: <br />
                <input type="text" name='long' placeholder='Mention longitude here' onChange = {this.handleChange} /><br/> <br/>
                <input type="submit" value="Find PetroPumps" />
            </form>
            <ul>
            {pumps && pumps.map(pump => {
                return(
                    <li key={pump._id}>
                        <span className={pump.available}></span>
                        <span className='name'>{pump.name}</span>
                        <span className='rank'>{pump.rank}</span>
                        <span className='dist'>{Math.floor(pump.dist.calculated/1000)} kms</span>
                    </li>
                );
             })
            }
            </ul>
        </div>
          
    );
}
};

export default PetrolPump; 