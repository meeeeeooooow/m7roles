const strategies = {
    m7_guides: {
        roles: {
            "Archer": [ "s1levLeft", "s1levRight", "s2eeHigh" /* got bored, rest of arch is still missing! */],
            "Bers": [],
            "Mage": [],
            "Tank": [ "s1term2", "s1term1", "s2term1", "s2term3", "s2levRight", "s3term1", "s3levRight", "s3levLeft", "s4term1" ],
            "Healer": [ "s1dev", "s2dev", "s2levLeft", "s3eeLow", "s3term2", "s3dev","s4term4", "s4levRight", "s4levLeft" ]
        },
        annotations: [
            { type: "badge", termId: "s2dev", text: "pd", color: "pink", position: "bottom" },
            { type: "badge", termId: "s3dev", text: "pd", color: "pink", position: "bottom" },
            { type: "badge", termId: "s4dev", text: "i4", color: "red", position: "bottom" },            
        ]
    }
};