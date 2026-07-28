const strategies = {
    m7_guides: {
        roles: {
            "Archer": [ "s1term4", "s1term3", "s2term4", "s2levRight", "s3term4", "s3levRight", "s3levLeft", "s4term2" ],
            "Bers": [ "s4dev", "s2term5", "s2term3", "s2levRight", "s3term3", "s3dev", "s4term3", "s4levLeft", "s4levRight" ],
            "Mage": [ "s1levLeft", "s1levRight", "s2eeHigh", "s2dev", "s2term2", "core" ],
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