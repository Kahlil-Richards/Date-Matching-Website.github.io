//Added at the bottom of html for speed purposes
var First = new Array();
var Last = new Array();
var Mo = new Array();
var Da = new Array();
var Ye = new Array();
var Ge = new Array();
var Ag = new Array();
var Body = new Array();
var Hei = new Array();

//Variable for Errors
var FError;
var LError;
var DError;
var GError;
var HError;
var YError;

//Other global variables
var alphaExp = /^[a-zA-Z]+$/;//Alphabeth letters only
var AgePlaceHolder;
var m
var mth;
var d;
var ArryGend;
var BodyDefault;

//Error Ceck functions
function Fcheck(){
	var len=document.getElementById("FName").value.length;
	if(len<3){
		document.getElementById("error1").innerHTML= "'3' Minimum characters";
		FError=1;
	}else{
		if(document.getElementById("FName").value.match(alphaExp))//Check if value entered is a character
		{
		   document.getElementById("error1").innerHTML= "";
		   FError=0;
		}
		else{
			document.getElementById("error1").innerHTML= "Invalid Character";
			FError=1;
		}
	}
	return FError;
}
function Lcheck(){
	var len=document.getElementById("LName").value.length;
	if(len<3){
		document.getElementById("error2").innerHTML= "'3' Minimum characters";
		LError=1;
	}else{
		if(document.getElementById("LName").value.match(alphaExp))//Check if value entered is a character
		{
		   document.getElementById("error2").innerHTML= "";
		   LError=0;
		}
		else{
			document.getElementById("error2").innerHTML= "Invalid Character";
			LError=1;
		}
	}
	return LError;
}
function Dcheck(){
	//Check month to ensure day is not avaliable eg. Feb 30.
	m=document.getElementById("Month");	
	mth=m.options[m.selectedIndex].value;
	d=document.getElementById("Day").value;

	if(d<1){
		document.getElementById("error3").innerHTML= "Min Day '1'";
		DError=1;
	}else{
		if(d>31){
			document.getElementById("error3").innerHTML= "Max Day '31'";
			DError=1;
		}else{
			if(mth==2){//check if month is february to set ending date to 28
				if(d>28){
					document.getElementById("error3").innerHTML= "Max Day '28'";
					DError=1;
				}else{
					document.getElementById("error3").innerHTML= "";
					DError=0;
				}
			}else{
				if((mth==4)||(mth==6)||(mth==9)||(mth==11)){//Check the months with days ending at 30
					if(d>30){
						document.getElementById("error3").innerHTML= "Max Day '30'";
						DError=1;
					}else{
						document.getElementById("error3").innerHTML= "";
						DError=0;
					}
				}else{
					document.getElementById("error3").innerHTML= "";
					DError=0;
				}
			}
			Acheck();	
		}
	}
	return DError, m;
}
function Ycheck(){
	if((document.getElementById("Year").value)<1947){
		document.getElementById("error3.1").innerHTML= "Min Year '1947'";
		YError=1;
	}else{
		if((document.getElementById("Year").value)>1999){
			document.getElementById("error3.1").innerHTML= "Max Year '1999'";
			YError=1;
		}else{
			document.getElementById("error3.1").innerHTML= "";
			YError=0;
			Acheck();
		}
	}
	return YError;
}
function Acheck(){
	//Check Age
	var y=document.getElementById("Year").value;
	var today_date = new Date();
	var today_year = today_date.getFullYear();
	var today_month = today_date.getMonth();
	var today_day = today_date.getDate();
	var age = today_year - y;
	
	if(today_month < (mth - 1))
	{
		age--;
	}
	if(( (mth - 1) == today_month) && (today_day < d))
	{
		age--;
	}
	AgePlaceHolder= age;
	document.getElementById("Age").innerHTML= age+" Years Old";
	return AgePlaceHolder;
}
function gend(){
	if(document.getElementById("Male").checked){
		document.getElementById('men').style.visibility = 'visible';
		document.getElementById('women').style.visibility = 'hidden';
		ArryGend="Male";
		BodyDefault="men";//Setting default value if me=ale is selceted
	}else{	
		if(document.getElementById("Female").checked){

			document.getElementById('women').style.visibility = 'visible';
			document.getElementById('men').style.visibility = 'hidden';
			ArryGend="Female";
			BodyDefault="women";
		}else{
			document.getElementById('women').style.visibility = 'hidden';
			document.getElementById('men').style.visibility = 'hidden';
		}
	}
	if((document.getElementById("Male").checked)||(document.getElementById("Female").checked)){
		GError=0;
		document.getElementById("Sex").innerHTML="";
		if(document.getElementById("Male").checked){
			BodyDefault=document.getElementById("BType");
		}else{
			BodyDefault=document.getElementById("BType1");
		}
	}else{
		GError=1;
		document.getElementById("Sex").innerHTML="Gender Not Selected";	
	}
	return ArryGend, BodyDefault, GError;
}
function Hcheck(){

	//varify height to write to array
	if((document.getElementById("Height").value)<170){
		document.getElementById("error4").innerHTML= "Min Height '170'";
		HError=1;
	}else{
		if((document.getElementById("Height").value)>200){
			document.getElementById("error4").innerHTML= "Max Height '200'";
			HError=1;
		}else{
			document.getElementById("error4").innerHTML= "";
			HError=0
		}
	}
	return HError;
}

//Processing Functions
function addnew(){
	Fcheck();//Call function to get the value of the errors to validate
	Lcheck();//Call function to get the value of the errors to validate
	Dcheck();//Call function to get the value of the errors to validate
	Ycheck()//Call function to get the value of the errors to validate
	Acheck();//Call function to get the value of the errors to validate
	gend();//Call function to get the value of the errors to validate
	Hcheck();//Call function to get the value of the errors to validate

	//Check for all errors in different fields and push to array
	var a=m.options[m.selectedIndex].text;

	if((FError==0)&&(LError==0)&&(DError==0)&&(GError==0)&&(HError==0)&&(YError==0)){
		First.push(document.getElementById("FName").value);
		Last.push(document.getElementById("LName").value);
		Da.push(document.getElementById("Day").value);
		Ye.push(document.getElementById("Year").value);
		Mo.push(a);
		Da.push(document.getElementById("Day").value);
		Ge.push(ArryGend);
		Ag.push(AgePlaceHolder);
		Body.push(BodyDefault.options[BodyDefault.selectedIndex].text);
		Hei.push(document.getElementById("Height").value);
		alert("SUCCESSFULLY ADDED");
		showall();
		reset();
	}else{
		document.getElementById("result").innerHTML="UNSUCCESSFUL";//shows error for 4.5 sec
		setInterval(function(){
			document.getElementById("result").innerHTML="";
		}, 4500);
		alert("FIELD(S) INVALID");
		return false;
	}
}
function showall(){
	var i=First.length;//get size of array
	i=i-1;
	var area=document.getElementById("showallpersons");

	area.value+="\n";
	area.value+="\t\t\t";
	area.value+=First[i]+",\t";
	area.value+=Last[i]+",\t";
	area.value+=Ag[i]+",\t";
	area.value+=Ge[i]+",\t";
	area.value+=Hei[i]+"\t";
}
function findmatches(){
	var match=0;
	var counter=0;
	var len=First.length;
	var currposn=0;
	var randposn=0;
	var AgeValue;
	var HeightValue;
	var RGender;

	var area=document.getElementById("showmatches");
	area.value="\n\n\n\n\t\t\t\t\t\t\t\t";
	area.value+=First[currposn]+" ";
	area.value+=Last[currposn]+" ";
	area.value+=" matched to: ";
		
	while(counter<10){
		randposn=Math.floor(Math.random() * len);
		AgeValue=Ag[randposn]-Ag[currposn];
		HeightValue=Hei[randposn]-Hei[currposn];

		if( (AgeValue<=10) && (AgeValue>=-10) ){
			if( (HeightValue<=10) && (HeightValue>=-10) ){
				if(Ge[currposn]!=Ge[randposn]){
					area.value+=First[randposn]+" ";
					area.value+=Last[randposn]+"\n";
					match=0;
					break;
				}else{
					match=1;
				}
			}else{
				match=1;
			}
		}else{
			match=1;
		}
		counter++;
	}
	if(match==1){
		area.value+="No Match...";
	}else{

	}
}

//Extras
function RadioReset(){
	var ele = document.getElementsByName("Gender");
   	for(var i=0;i<ele.length;i++)
    	ele[i].checked = false;
}
function reset(){
	document.getElementById("FName").value="";
	document.getElementById("LName").value="";
	document.getElementById("Month").value = 1;
	document.getElementById("Day").value="";
	document.getElementById("Year").value="";
	RadioReset();
	document.getElementById("Height").value="";
}