Template.rightNav.onCreated(function(){
	this.timeLeft = new ReactiveVar(false);
	let self = this;
	window.setInterval(function(){
		let tl = Meteor.user().activeJourney().timeLeft();
		self.timeLeft.set(tl);
	}, 1000)
})

Template.rightNav.helpers({
	timeLeft(){
		let timeLeft = Template.instance().timeLeft.get();
		if(timeLeft > 0 || timeLeft === false) {
			return Template.instance().timeLeft.get();
		}
		else {
			return "Finish this last capture to complete your journey!"
		}
	}
})

Template.rightNav.events({
	"click [data-stop-journey]"(){
		if(confirm("Are you sure you wanna stop?")){
			UserJourneys.update({_id: Meteor.user().activeJourney()._id}, {$set: {isActive: false}})
			FlowRouter.go("home")
		}
	}
})