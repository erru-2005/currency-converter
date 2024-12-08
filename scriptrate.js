let BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let selection= document.querySelectorAll(".tcls select");
let msg=document.querySelector(".msg p" );
let btn=document.querySelector("button");
let tocur=document.querySelector(".tcls select");
let fromcur=document.querySelector(".fcls select");

for(let choice of selection )
    {
        for(curr in countryList)
            {
                let newop=document.createElement("option");
                newop.innerText=curr;
                newop.value=curr;
                choice.append(newop);
                
                 if(choice.name==="to"&&curr==="INR")
                {
                    newop.selected="selected";
                }


            }
            choice.addEventListener("change",(evt)=>{
                updateflag(evt.target);

            });

    }
    const updateflag=(ele)=>{
            
        let newsrc= `https://flagsapi.com/${countryList[ele.value]}/flat/64.png`;
        let img=ele.parentElement.querySelector("img");
        img.src=newsrc;
        img.style.objectFit="cover";
       
    };

    const updateexchangerate= async()=>{
        let amt=document.querySelector(".amt input");
        
        if(amt.value<1||amt.value==="")
            {
                amt.value=1;

            }
          

            const URL = `https://v6.exchangerate-api.com/v6/71749dba24d0b1e5c5be467a/latest/${fromcur.value}`;
            let response = await fetch(URL);
           
            let data = await response.json();
            let rate = (data.conversion_rates[tocur.value]);
            console.log(data);
            let value= amt.value;
           
            let finalAmount = value * rate;
            msg.innerText = `${value} ${fromcur.value} = ${finalAmount} ${tocur.value}`;
          }
    



    btn.addEventListener("click",()=>{
        updateexchangerate();
    });