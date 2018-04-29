import React,{Component} from 'react';
import axios from 'axios';
import '../css/admin.css';
import {Link} from 'react-router-dom';

class hall extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        hallName: '',
        hallAddress: '',
        hallCity: '',
        hallZipCode: '',
        hallState: '',
        hallNameError:'',
        zipCodeError:'',
        stateError:'',
        screenCount:'',
        screensArray:[],
        screens:{
            movieTimings:[],
            movieName:"",
            movieRating:"",
            movieLength:"",
            movieCategory:"",
            price:""
        },
        hallData : [],
        newScreenID : "",
        newScreenName : "",
        newScreenTime : ""
      }
       
      
    }

    validate = () => {
      let isError = false;
      const errors = {
        firstNameError: "",
        emailError: "",
        zipCodeError: "",
        stateError: "",
        cardNumberError:""
      };
      
      if (this.state.hallName.length ===0) {
        isError = true;
        errors.hallNameError = "First Name cannot be empty";
      }

      
      var isZipValid = /\d{5}-\d{4}$|^\d{5}$/.test(this.state.hallZipCode);

      if(!isZipValid){
        isError = true;
        errors.zipCodeError = "Invalid Zip Code, enter in either xxxx or xxxxx-xxxx format";
      }

     var isStateValid=/^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)$/.test(this.state.hallState);

      if(!isStateValid){
        isError = true;
        errors.stateError = "Invalid State Abbrevation";
      }
      this.setState({
        ...this.state,
        ...errors
      });
  
      return isError;
    };

    componentWillMount(){

        if(this.props.location.state.id!="0"){
        var url = 'http://localhost:8900/hallById/' + this.props.location.state.id;
        
        axios(url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((res) => {
            this.setState({
                hallData : this.state.hallData.concat(res.data[0]),
                hallName: res.data[0].hallName, 
                hallAddress: res.data[0].hallAddress,
                hallCity: res.data[0].hallCity,
                hallZipCode: res.data[0].hallZipCode,
                hallState: res.data[0].hallState,
                screenCount:res.data[0].screens.length,
                screens:res.data[0].screens
                });
            }
          )
        }


    }
    updateProfile(){

      const err = this.validate();
      if (!err) {

       var url = 'http://localhost:8900/user/' + this.props.location.state.id;
       axios(url, {
         method: 'PUT',
         mode: 'cors',
         headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
         data: JSON.stringify({fName: this.state.fname, lName: this.state.lname,
          email: this.state.email, address: this.state.address, 
          city: this.state.city, state: this.state.state,
          zipCode: this.state.zipCode, phoneNumber: this.state.phoneNumber,
          password: this.state.password, profileImage: this.state.profileImage,
          userType: this.state.userType,
          creditCard:{
            cardNumber:this.state.cardnumber,
            nameOnCard:this.state.nameoncard,
            expiry:this.state.expiry,
            cvv:this.state.cvv
          }

          })
          
          
       }).then((res) => {
        if(res.status === 200){
          this.setState({message: "Profile changed successfully"});
        }
        else{
          this.setState({message: "Couldn't change the profile"});
        }
       });
    }
  }

  createProfile(){
    console.log("Inside Create Profile");
    const err = this.validate();
    if (!err) {

     var url = 'http://localhost:8900/signup/';
     axios(url, {
       method: 'POST',
       mode: 'cors',
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       data: JSON.stringify({fName: this.state.fname, lName: this.state.lname,
        email: this.state.email, address: this.state.address, 
        city: this.state.city, state: this.state.state,
        zipCode: this.state.zipCode, phoneNumber: this.state.phoneNumber,
        password: this.state.password, profileImage: this.state.profileImage,
        userType: this.state.userType,
        password:this.state.password,
        creditCard:{
          cardNumber:this.state.cardnumber,
          nameOnCard:this.state.nameoncard,
          expiry:this.state.expiry,
          cvv:this.state.cvv
        }

        })
        
        
     }).then((res) => {
      if(res.status === 200){
        this.setState({message: "User created successfully"});
      }
      else{
        this.setState({message: "Couldn't create the user"});
      }
     })
  }
  }
 
  
  AddScreen = (e) =>{
    let hallObj = this.state.hallData;
    let newScreenID = this.state.newScreenID, newScreenName = this.state.newScreenName, newScreenTime = this.state.newScreenTime;
    var screenUpdate = 0;
    this.state.hallData.map(hall => {
        hall.screens.map(screen => {
            if(screen.movieName == newScreenName){
                screenUpdate = 1;
                return;
            }
        })
    }) 
    console.log("After return : ", screenUpdate);
      if(screenUpdate == 1){
          var seatArr = [];
          for(var i=0;i<169;i++){
            seatArr[i]=0;
          }
          let screenObj = {
              'seats' : seatArr,
              'movieTime' : newScreenTime,
              'screenID' : newScreenID
          };
          hallObj = hallObj.map(hall=>{
            console.log("Hall : ", hall);
            hall.screens = hall.screens.map(screen =>{
              console.log("Screens :",screen);
              
              if(screen.movieName == newScreenName){
               
                  screen.movieTimings.push(screenObj);
              
              }
              return screen;
            })
            return hall;
          })
          console.log("Added New Screen : ",hallObj);
          var url = 'http://localhost:8900/user/' + this.props.location.state.id;
          axios(url, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data : hallObj
          })
      }else{
        let hallObj = this.state.hallData;
        var url = 'http://localhost:8900/movieByName/' + newScreenName;
        axios(url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((res) => {
              let movieData = res.data;
              var seatArr = [];
              for(var i=0;i<169;i++){
                seatArr[i]=0;
              }
              let screenObj = {
                  'seats' : seatArr,
                  'movieTime' : newScreenTime,
                  'screenID' : newScreenID
              };
              let NewScreenObj = {
                  'movieCategory' : movieData.movieCategory,
                  'movieLength' : movieData.movieLength,
                  'movieName' : movieData.movieName,
                  'movieRating' : movieData.movieRating,
                  'movieTimgs' : screenObj
              }
              hallObj = hallObj.map(hall=>{
                console.log("Hall : ", hall);
                hall.screens.push(NewScreenObj);
                return hall;
              })
        })
      }
      var resData = {
          hallId : this.props.location.state.id,
          screenID : newScreenID,
          movieTime : newScreenTime,
          movieName : newScreenName
      }
      var url = 'http://localhost:8900/hall';
      axios(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
        },
        data : resData
      })
        
    }
    AddScreenID = (e) =>{
      this.setState({
        newScreenID : e.target.value
      })
    }

    AddMovieName = (e) => {
      this.setState({
        newScreenName : e.target.value
      })
    }

    AddMovieTime(e){
      this.setState({
        newScreenTime : e.target.value
      })
    }

  render() {
      
    console.log("Response Data Recieved : ", this.state.hallData);
    let displayScreens="";
    let displayButton="";
    let screensArray=[];
    let screensData = null, timings = null,movieData = null;
    if(this.state.hallData.length > 0){
      screensData = this.state.hallData.map(hall => {
        movieData = hall.screens.map(screen => {
          timings = screen.movieTimings.map(time =>{
            return(
              <div>
                <div className="form-group">
                  <label>Screen ID</label> 
                      <input  type="text" className="form-control" placeholder="Screen ID" value={time.screenID} required />
                </div>
                <div className="form-group">
                  <label>Movie Time</label> 
                      <input  type="text" className="form-control" placeholder="Movie Time" value={time.movieTime} required />
                </div> 
              </div>
            )
          })
          return(
            <div> 
              <div className="form-group">
                  <label>Movie Name</label> 
                      <input  type="text" className="form-control" placeholder="Movie Time" value={screen.movieName} required />
                </div> 
              {timings}
            </div>
          )
        })
      });
    }
    /**this.state.screens.map(function(screen){
        screensArray.push(screen);
    });*/


   
      if(this.props.location.state.id==="0") {
        displayButton=(<button type="button" id="submit" name="submit" className="btn btn-primary pull-right" onClick={this.createProfile.bind(this)}>Create</button>);
      }else{
        displayButton=(<button type="button" id="submit" name="submit" className="btn btn-primary pull-right" onClick={this.updateProfile.bind(this)}>Update</button>);
      };
     
      return (
        <div >
        <div id="headerContainer" class="purchase detail on-order" name="HeaderContainer">
            <div id="headerPurchase">
                <div className="commonContainer"> 
                    <div id="logo">
                        <a href="http://www.fandango.com/" title="Click to go to Fandango homepage">Fandango Home</a>
                    </div>
                    <div id="bannerMessage">You're a guaranteed ticket away from the perfect movie night.</div>
                </div>
            </div>
        </div>
         <div className = "container">
          <div className = "row">
       

        <div className="col-md-9">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                  <p className="errMsg">{this.state.hallNameError}</p>
                  <input  type="text" className="form-control" placeholder="Hall Name" value={this.state.hallName} onChange={(event)=>{
                    this.setState({hallName: event.target.value.trim(),hallNameError:"",message:""});
                  }}  required />
                </div>
                <div className="form-group">
                  <input  type="text" className="form-control" placeholder="Address" value={this.state.hallAddress} onChange={(event)=>{
                    this.setState({hallAddress: event.target.value.trim(),message:""});
                  }} required />
                </div>
                <div className="form-group">
                  <input  type="text" className="form-control" placeholder="City" value={this.state.hallCity} onChange={(event)=>{
                    this.setState({hallCity: event.target.value.trim(),message:""});
                  }} required />
                </div>
                <div className="form-group">
                <p className="errMsg">{this.state.stateError}</p>
                  <input  type="text" className="form-control" placeholder="State" value={this.state.hallState} onChange={(event)=>{
                    this.setState({hallState: event.target.value.trim(),message:"",stateError:""});
                  }} required />
                </div>
                <div className="form-group">
                <p className="errMsg">{this.state.zipCodeError}</p>
                  <input  type="text" className="form-control" placeholder="Zip Code" value={this.state.hallZipCode} onChange={(event)=>{
                    this.setState({hallZipCode: event.target.value.trim(),zipCodeError:"",message:""});
                  }} required />
                </div>
                <div className="form-group">
                  <input  type="text" className="form-control" placeholder="Screen Count" value={this.state.screenCount} onChange={(event)=>{
                    this.setState({screenCount: event.target.value.trim(),message:""});
                  }} required />
                </div>

                {/*<div className="form-group">*}
                 {
                   
                   /*screensArray.map((screen) => {
                    
                    return(
                        <div className="form-group">
                        <input  type="text" className="form-control" placeholder="Screen Count" value={screen.movieName} onChange={(event)=>{
                          this.setState({screenCount: event.target.value.trim(),message:""});
                        }} required />
                      </div>
                    )
                
                    })
                */movieData}  
                {/*</div>*/}
                {displayButton}
                <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add a Screen</button>
                <div class="modal fade" id="myModal" role="dialog">
	<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title">Add a new Screen</h4>
		</div>
		
	<br/>
	
	<div class="modal-body">
		<div className="form-group">
            <label>Screen ID</label> 
            <input onChange = {(e) => this.AddScreenID(e)} type="text" className="form-control" placeholder="Screen ID"  required />
        </div>
		<div className="form-group">
            <label>Movie Name</label> 
            <input onChange = {(e) => this.AddMovieName(e)} type="text" className="form-control" placeholder="Movie Name"  required />
        </div>
		<div className="form-group">
            <label>Movie Time</label> 
            <input onChange = {(e) => this.AddMovieTime(e)} type="text" className="form-control" placeholder="ovie Time"  required />
        </div>
	</div>
	<div class="modal-footer">
		<Link to = "" onClick = {(e) => this.AddScreen(e)} type="button" class="btn btn-default" data-dismiss="modal">Submit</Link>
	</div>
	</div>
	
</div>
</div>

             </form>
              <div className="success">{this.state.message}</div>
              <br></br>
          </div>
        </div>

        </div>
        </div>
        </div>
      )
    }
}


export default hall;