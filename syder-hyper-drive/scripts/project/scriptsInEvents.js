
function rewardedBreak(runtime, purpose)
{
   
    runtime.globalVars.reward_purpose = purpose;

}



const scriptsInEvents = {

	async Game_Event339_Act1(runtime, localVars)
	{
		rewardedBreak(runtime, "FreeBucks");
	},

	async Game_Event383_Act51(runtime, localVars)
	{
		gameplayStart();
	},

	async Game_Event431_Act1(runtime, localVars)
	{
		let locked_state = runtime.globalVars.LockedState;
		let seperated_items = locked_state.split(",");
		seperated_items[runtime.globalVars.Character-2] = "0";
		runtime.globalVars.LockedState = seperated_items.join(",");
	},

	async Game_Event434_Act1(runtime, localVars)
	{
		rewardedBreak(runtime, "CarUnlock")
	},

	async Game_Event474_Act1(runtime, localVars)
	{
		  if( runtime.globalVars.reward_purpose == "FreeBucks")
		            {
		                runtime.globalVars.money_counter += runtime.globalVars.freeMoneyCount;
						console.log(runtime.globalVars.money_counter);
						runtime.callFunction("StoreMoney");
		            }
					if( runtime.globalVars.reward_purpose == "CarUnlock")
					{
						runtime.globalVars.money_counter -= runtime.globalVars.Character * runtime.globalVars.rewardedAdCharacterCostMultiplier;
						let locked_state = runtime.globalVars.LockedState;
						let seperated_items = locked_state.split(",");
						seperated_items[runtime.globalVars.Character-2] = "0";
						runtime.globalVars.LockedState = seperated_items.join(",");
						runtime.globalVars.rewardedCarUnlock = true;
					}
		        
		//         // if the audio was paused you can resume it here (keep in mind that the function above to pause it might not always get called)
		        let money_texts = runtime.objects.money_txt.getAllInstances();
				for(let money_text of money_texts)
					{
						if(money_text.instVars.id == 1)
							{
								money_text.text = String(runtime.globalVars.money_counter);
							}
					}
	},

	async Missionhandler_Event18(runtime, localVars)
	{
		let currentMission = runtime.globalVars.currentMission;
		let missionArray =runtime.objects.missionArray.getFirstInstance();
		let missionStatusText = runtime.objects.missionStatus.getFirstInstance();
		let completed = true;
		let missionBg = runtime.objects.mission_bg.getFirstInstance();
		let checkInstance = runtime.objects.check.getAllInstances();
		let missionCompleteArray = runtime.objects.missionCompleteArray.getFirstInstance();
		let audioHandle = runtime.objects.Audio.getFirstInstance();
		
		for(let i=0; i<missionArray.height; i++)
		{
			let currObjective = missionArray.getAt(currentMission, i);
			if( currObjective != "")
			{
			
			switch(i)
				{
					case 0:
						if(currObjective > runtime.globalVars.rightFlipCount)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.rightFlipCount)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.instVars.value = 1
							runtime.globalVars.rightFlipCount += 1;
						}
						break;
					case 1:
						if(currObjective > runtime.globalVars.leftFlipCount)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.leftFlipCount)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.instVars.value = 1;
							runtime.globalVars.leftFlipCount += 1;
						}
						break;
					case 2:
						if(currObjective > runtime.globalVars.moneyCount)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.moneyCount)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.instVars.value = 1;
							runtime.globalVars.moneyCount += 1;
						}
						break;
					case 3:
						if(currObjective > runtime.globalVars.fuelCount)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.fuelCount)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.instVars.value = 1;
							runtime.globalVars.fuelCount += 1;
						}
						break;
					case 4:
						if(currObjective > runtime.globalVars.landingCount)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.landingCount)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.instVars.value = 1;
							runtime.globalVars.landingCount += 1;
						}
						break;
					case 5:
						if(currObjective > runtime.globalVars.fenceCount)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.fenceCount)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.instVars.value = 1;
							runtime.globalVars.fenceCount += 1;
						}
						break;
					case 6:
						if(currObjective > runtime.globalVars.bombCount)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.bombCount)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.value = 1;
							runtime.globalVars.bombCount += 1;
						}
						break;
					case 7:
						if(currObjective > runtime.globalVars.jumpCount)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.jumpCount)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.instVars.value = 1;
							runtime.globalVars.jumpCount += 1;
						}
						break;
					case 8:
						if(currObjective > runtime.globalVars.distanceCovered)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.distanceCovered)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.instVars.value = 1;
							runtime.globalVars.distanceCovered += 1;
						}
						break;
					case 9:
						if(currObjective > runtime.globalVars.crashCount)
						{
							completed = false;
						}
						else if (currObjective == runtime.globalVars.crashCount)
						{
							missionCompleteArray.setAt(1, i);
							missionBg.instVars.value = 1;
							runtime.globalVars.crashCount += 1;
						}
						break;
				}
			}
		}
		for(let i=0; i<3; i++)
		{
			if(missionCompleteArray.getAt(checkInstance[i].instVars.missionIndex) && checkInstance[i].animationFrame == 0)
				{
					checkInstance[i].animationFrame = 1;
				}
		}				
		if(completed)
		{
			runtime.globalVars.missionComplete = 1;
			
		} 
	},

	async Missionhandler_Event33_Act7(runtime, localVars)
	{
		console.log("Ads Called Debug")
	},

	async Functions_Event14(runtime, localVars)
	{
			let currentMission = runtime.globalVars.currentMission;
			let missionArray =runtime.objects.missionArray.getFirstInstance();
			let missionText = runtime.objects.missionText.getFirstInstance();
			let missionStatus = runtime.objects.missionStatus.getFirstInstance();
			let checkInstance = runtime.objects.check.getAllInstances();
			let check_counter = 0;
			missionText.text = "";
			missionStatus.text = "";
		
			for(let i=0; i<missionArray.height; i++)
			{
				let currObjective = missionArray.getAt(currentMission, i);
				if( currObjective != "")
				{
				
				switch(i)
					{
						case 0:
							missionText.text = missionText.text + "\nPerform " + currObjective + " Front Flips"
							checkInstance[check_counter].instVars.missionIndex = 0;
							check_counter += 1;
							break;
						case 1:
							missionText.text = missionText.text + "\n" + "Perform " + currObjective + " Back Flips"
							checkInstance[check_counter].instVars.missionIndex = 1;
							check_counter += 1;
							break;
						case 2:
							missionText.text = missionText.text + "\n" + "Collect " + currObjective + " Chips"
							checkInstance[check_counter].instVars.missionIndex = 2;
							check_counter += 1;
							break;
						case 3:
							missionText.text = missionText.text + "\n" + "Collect " + currObjective + " Energy"
							checkInstance[check_counter].instVars.missionIndex = 3;
							check_counter += 1;
							break;
						case 4:
							missionText.text = missionText.text + "\n" + "Perfect Landing " + currObjective + " Times"
							checkInstance[check_counter].instVars.missionIndex = 4;
							check_counter += 1;
							break;
						case 5:
							missionText.text = missionText.text + "\n" + "Avoid " + currObjective + " Fences"
							checkInstance[check_counter].instVars.missionIndex = 5;
							check_counter += 1;
							break;
						case 6:
							missionText.text = missionText.text + "\n" + "Avoid " + currObjective + " Bombs"
							checkInstance[check_counter].instVars.missionIndex = 6;
							check_counter += 1;
							break;
						case 7:
							missionText.text = missionText.text + "\n" + "Jump " + currObjective + " Times"
							checkInstance[check_counter].instVars.missionIndex = 7;
							check_counter += 1;
							break;
						case 8:
							missionText.text = missionText.text + "\n" + "Travel " + currObjective + "m Distance"
							checkInstance[check_counter].instVars.missionIndex = 8;
							check_counter += 1;
							break;
						case 9:
							missionText.text = missionText.text + "\n" + "Crash Bomb " + currObjective + " Times"
							checkInstance[check_counter].instVars.missionIndex = 9;
							check_counter += 1;
							break;
		
					}
				}
			}
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

