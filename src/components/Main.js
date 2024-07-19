import React, {useState, useEffect} from "react"

export default function Main(){
    const [checklist, setChecklist] = useState({
            bicepCurls: false, 
            squats: false, 
            hammerCurls: false, 
            benchPress: false, 
            deadLift: false, 
            calfRaises: false, 
            pullups: false,
            situps: false,
            
    });
    const[newWorkout, setNewWorkout] = useState("");
    const[selectedMuscleGroup, setSelectedMuscleGroup] = useState([]);
    const[highlightedMuscle, setHighlightedMuscle] = useState("");
    const [armCount, setArmCount] = useState(0);
    const [legCount, setLegCount] = useState(0);
    const [coreCount, setCoreCount] = useState(0);
    const [chestCount, setChestCount] = useState(0);
    const [backCount, setBackCount] = useState(0);
    const [highestCount, setHighestCount] = useState(0);
    const [highestCategory, setHighestCategory] = useState("");

    useEffect(() => {
        const counts = {
            arm:0, leg:0, core:0, chest:0, back:0,
        };
        Object.keys(checklist).forEach((key) => {
            if(checklist[key]){
                if (key.includes('bicep') || key.includes('tricep') || key.includes('forearm') || key.includes('shoulder') || key.includes('benchPress') || key.includes('bicepCurls') || key.includes('hammerCurls')) {
                    counts.arm++;
                  } else if (key.includes('quad') || key.includes('calf') || key.includes('hamstring') || key.includes('glute') || key.includes('deadLift') || key.includes('squats') ||key.includes('calfRaises')) {
                    counts.leg++;
                  } else if (key.includes('upperab') || key.includes('midab') || key.includes('lowerab') || key.includes('oblique')||key.includes('pullups') || key.includes('situps')) {
                    counts.core++;
                  } else if (key.includes('chest') || key.includes('chestPress')) {
                    counts.chest++;
                  } else if (key.includes('neck') || key.includes('lat') || key.includes('trap') || key.includes('lowerback') || key.includes('pullups')) {
                    counts.back++;
                  }
            }
        });

        setArmCount(counts.arm);
        setLegCount(counts.leg);
        setCoreCount(counts.core);
        setChestCount(counts.chest);
        setBackCount(counts.back);

        const maxCount = Math.max(counts.arm, counts.leg, counts.core, counts.chest, counts.back);
        setHighestCount(maxCount);

        let category = "";
        switch (maxCount) {
        case counts.arm:
            category = "arm";
            break;
        case counts.leg:
            category = "leg";
            break;
        case counts.core:
            category = "core";
            break;
        case counts.chest:
            category = "chest";
            break;
        case counts.back:
            category = "back";
            break;
        default:
            break;
        }

        setHighestCategory(category);

    }, [checklist]);

    const handleCheck = (event) => {
        const {name, checked} = event.target;
        setChecklist((prevState) => ({
            ...prevState, 
            [name]: checked
        }));
        updateHighlightedMuscle(name, checked);
       
    };
    const updateHighlightedMuscle = (name, checked) => {
        if (checked) {
            const muscleGroup = name.split("-")[0];
            setHighlightedMuscle((prev) =>
                prev ? `${prev} ${muscleGroup}` : muscleGroup
            );
            
          }
          
        else {
            const muscleGroup = name.split("-")[0];
            setHighlightedMuscle((prev) =>
                prev.replace(muscleGroup, "").trim()
            );
            
          }
    };

    const handleAddWorkout = () =>{
        if (newWorkout && selectedMuscleGroup.length > 0) {
            const workoutKey = `${selectedMuscleGroup.join("_")}_${newWorkout}`;
            setChecklist((prevState) => ({
                ...prevState,
                [workoutKey]: false,
            }));

            //updateCountsForGroup(selectedMuscleGroup);
            setNewWorkout("");
            setSelectedMuscleGroup([]);
        }

        };
    
    const handleMuscleGroupChange = (event) => {
        const { value, checked } = event.target;
        setSelectedMuscleGroup((prev) =>
          checked ? [...prev, value] : prev.filter((group) => group !== value)
        );
        //updateCountsForGroup([value]);
      };
      
      /*const updateCountsForGroup = (groups) => {
        const counts = {
            arm: armCount,
            leg: legCount,
            core: coreCount,
            chest: chestCount,
            back: backCount,
          };
          groups.forEach((group) => {
            switch (group) {
              case "bicep":
              case "tricep":
              case "forearm":
              case "shoulder":
                counts.arm++;
                break;
              case "quad":
              case "calf":
              case "hamstring":
              case "glute":
                counts.leg++;
                break;
              case "upperab":
              case "midab":
              case "lowerab":
              case "oblique":
                counts.core++;
                break;
              case "chest":
                counts.chest++;
                break;
              case "neck":
              case "lat":
              case "trap":
              case "lowerback":
                counts.back++;
                break;
              default:
                break;
            }
          });
            setArmCount(counts.arm);
            setLegCount(counts.leg);
            setCoreCount(counts.core);
            setChestCount(counts.chest);
            setBackCount(counts.back);

            const maxCount = Math.max(counts.arm, counts.leg, counts.core, counts.chest, counts.back);
            setHighestCount(maxCount);

            let category = "";
            switch (maxCount) {
            case counts.arm:
                category = "arm";
                break;
            case counts.leg:
                category = "leg";
                break;
            case counts.core:
                category = "core";
                break;
            case counts.chest:
                category = "chest";
                break;
            case counts.back:
                category = "back";
                break;
            default:
                break;
            }
            setHighestCategory(category);
      };*/

      const formatWorkoutName = (name) => {
        if (name.includes("_")) {
            const parts = name.split("_");
            return parts[parts.length - 1];
          }
        return name.replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    };

    const getWorkoutLink = (workout) => { 
        const workoutLinks = {
            bicepCurls: "./b0dyf0cus2/bicep-curls.webp",
            squats: "./b0dyf0cus2/squats.webp",
            hammerCurls: "./b0dyf0cus2/hammer-curls.webp",
            benchPress: "./b0dyf0cus2/bench-press.webp",
            deadLift: "./b0dyf0cus2/deadlift.webp",
            calfRaises: "./b0dyf0cus2/calf-raises.webp",
            pullups: "./b0dyf0cus2/pull-ups.webp", 
            situps: "./b0dyf0cus2/sit-ups.webp",
            /*bicepCurls: `${process.env.PUBLIC_URL}/images/bicep-curls.webp`,
            squats: `${process.env.PUBLIC_URL}/images/squats.webp`,
            hammerCurls: `${process.env.PUBLIC_URL}/images/hammer-curls.webp`,
            benchPress: `${process.env.PUBLIC_URL}/images/bench-press.webp`,
            deadLift: `${process.env.PUBLIC_URL}/images/deadlift.webp`,
            calfRaises: `${process.env.PUBLIC_URL}/images/calf-raises.webp`,
            pullups: `${process.env.PUBLIC_URL}/images/pull-ups.webp`, 
            situps: `${process.env.PUBLIC_URL}/images/sit-ups.webp`,*/
            
        };
        return workoutLinks[workout] || "#";
    };

    
    return (
        <div className = "M-G">
            <div className = "image" >
            <svg width="836" height="715" viewBox="0 0 936 815" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="936" height="815" fill="#FFFFF"/>
                <g id="WholeBodyFront">
                <path id="Vector 1" d="M178.5 81C178.128 78.5 176.284 75.1442 177 68.5C173.938 69.7926 172.252 70.8076 168.5 65.5C167.412 64.4402 166.767 63.5062 165 56C165.459 56.0083 163.848 45.0543 166 44C168.152 42.9457 169.141 43.2801 171.5 46V33C172.508 22.2492 173.872 16.8156 179.5 9.50003C185.338 3.1388 190.84 1.29947 204.5 1.00003C220.291 2.17235 228.5 11.5 232.5 23.5C236.5 35.5 235 46 235 46C235 46 238.279 43.7123 240 46C240.71 49.3304 240.568 51.6351 240 56C239.07 63.1755 237.818 65.5599 235 68.5C232.7 68.8439 231.608 68.4827 230.5 65.5C229.392 62.5173 230.5 72.5 230.5 72.5C230.37 78.4724 231.126 79.0744 227 82.5M178.5 81C178.872 83.5 182.762 85.7346 188.5 89C195.676 91.6583 200.392 92.2758 209.5 92.5C217.945 89.7292 223.184 85.9546 227 82.5M178.5 81V106.5C168.975 117.292 162.535 122.337 148.5 129C133.96 127.672 127.239 129.757 114.5 134C105.451 140.709 102.508 146.344 95.5 157.5C92.045 169.314 92.4746 176.785 92.5 192V206.5C88.3882 215.876 86.9555 221.626 85.5 232.5V248C77.5141 257.206 73.7191 262.55 68.5 272.5C63.6761 283.479 61.7184 289.609 59.5 300.5C58.4822 314.371 57.2866 321.606 54 333.5C52.8449 341.71 52.2798 346.488 51.5 355.5C49.0657 367.849 47.5491 374.228 43 379C38.5057 384.974 33.7054 387.32 24 391L11 407L1 419.5C1.52666 422.279 3.8638 422.35 8 422.5C20.037 410.354 24.384 406.585 26.5 407C24.3022 411.487 23.5235 413.866 22.5 418C21.589 424.989 14.0531 435.405 6 449C5.7341 453.579 10 454.5 12.5 452.5C15 450.5 27.0235 426.014 29.5 427C32.3081 428.163 25.1757 443.884 20.5 458C19.8741 466.768 25.2334 464.847 27.5 460.5C29.7666 456.153 37.8999 434.534 39.5 430.5C46.364 425.807 37.5374 461.725 36.5 463.5C35.4626 465.275 39.7094 471.148 43 464.5C46.9979 443.015 49.2443 430.908 51.5 430.5C55.8321 428.061 55.5 447.5 55 454C54.5 460.5 60.6992 457.994 60.5 449C60.3008 440.006 62.5 424 61.5 423.5C65.7878 408.92 66.0102 404.673 68.5 402C69.6509 389.923 69.7361 384.182 68.5 376.5L98 316L111 283.5V272.5C116.302 251.714 120.134 241.756 129 228C133.085 230.633 134.477 236.206 136 250.5C137.607 260.045 138.619 263.676 140.5 269C144.088 274.112 142.688 282.394 142.5 293.5C140.567 301.285 139.641 306.548 138 316V338.5L129.5 369.5C127.529 385.867 127.426 390.469 127.5 397.5C126.572 408.377 125.15 411.991 123 419.5C120.841 435.334 120.678 440.932 121 449C124.513 482.232 126.405 500.901 134.5 532L132 597.5C128.755 622.5 128.237 635.392 129.5 656.5C136.316 680.113 138.412 693.938 139.5 719.5C140.382 722.198 141.295 730.997 143 748C140.8 755.812 141.029 760.581 143 769.5C140.501 777.628 135.945 783.726 127 795C126.762 808.133 132.479 808.406 143 808.5C146.465 811.811 148.913 811.655 153.5 810.5C155.193 812.702 156.807 813.127 160 813.5C167.664 807.123 173.207 799.668 173.5 794C169.66 776.905 167.094 770.957 174 751C166.955 738.734 165.527 730.518 166.5 714C175.888 682.391 180.002 665.318 180 639C175.695 619.535 174.069 608.814 174.5 590.5C178.789 569.946 180.767 559.25 180 548.5L186.5 527L198.5 469C198.996 448.667 200.805 428.757 198.5 424C202.21 425.47 203.897 425.308 206.5 424C203.967 427.125 205.98 448.459 206.5 469C213.843 491.926 216.382 504.602 219 527L224 548.5C226.263 567.618 228.066 576.157 231.5 590.5C231.577 610.466 229.377 620.626 226 639C228.618 671.045 231.788 687.243 239.5 714C239.857 727.963 238.292 736.051 232 751C232.269 758.884 232.947 762.917 235 769.5C234.63 781.621 233.868 787.732 232 798C236.355 805.187 239.389 808.484 245.5 813.5C249.157 813.176 250.696 812.607 252 810.5C258.663 811.823 260.632 811.113 262.5 808.5C274.408 809.61 279.32 807.725 281.5 795C272.172 787.212 267.461 782.256 262.5 769.5C264.935 762.28 266.11 758.079 265 748C264.341 716.143 266.293 696.536 276.5 656.5C277.563 628.924 277.165 615.18 272.5 597.5C273.151 568.196 272.595 554.162 270.5 532C279.322 496.365 282.648 477.856 284 449C284.736 436.534 285.193 429.517 282 419.5L279 397.5C277.767 371.194 275.814 357.986 269 338.5V316L263.5 293.5V269C266.881 262.048 268.422 258.071 269 250.5C273.996 237.527 275.352 232.536 275 228C279.396 239.11 282.445 244.57 288.5 253.5L294.5 272.5V283.5C320.312 339.294 337.816 369.996 336 376.5C336.378 385.774 336.733 391.078 338 401C340.153 413.727 341.359 418.787 343.5 424C343.188 437.97 344.513 449.304 345 452.5C349.214 465.73 350.866 455 351 455C351.134 455 349.898 432.613 352.5 430.5C357.63 427.705 359.224 445.176 363 462.5C365.6 468.587 368.375 469.864 369 461.5C365.153 442.61 364.06 432.66 365 429C371.634 439.686 376.429 458.198 382.5 464.5C385.233 465.066 386.127 464.434 386.5 461.5C378.927 440.338 374.697 428.511 375.5 426C382.427 428.862 387.194 441.655 394 452.5C398.608 454.906 399.461 453.426 400.5 450C388.77 429.559 382.751 418.617 380.5 407C391.438 418.414 396.193 422.115 401.5 422.5C407.006 421.919 408.398 420.63 401.5 413C387.271 392.589 383.451 388.116 368 384.5C360.775 379.048 358.174 371.896 355 355C349.709 325.398 346.123 299.058 343.5 293.5C337.719 272.847 333.821 261.86 320.5 248C319.279 227.355 318.614 215.728 312.5 207.5C314.414 185.656 313.155 173.776 310.5 157C301.539 143.798 298.587 135.764 288.5 132.5C273.814 129.884 266.445 128.636 263.5 129C248.954 126.778 241.089 121.98 227.5 108L227 82.5" fill = {'pink'} stroke="black"/>
                </g>
                <g id="neck">
                <g id="Vector 2">
                <path d="M196 128C190.011 99.4087 186.655 85.8326 180 85.5V107C184.555 121.006 186.754 130.256 196 139C196.239 132.43 196.26 129.006 196 128Z"  fill={highlightedMuscle.includes("neck") ? "red" : "none"}  stroke="black"/>
                <path d="M209.5 140C208.802 136.998 209.473 133.13 209.5 128C214.909 102.34 218.02 89.3714 226 84V109C220.899 123.311 216.409 133.333 209.5 140Z"  fill={highlightedMuscle.includes("neck") ? "red" : "none"}  stroke="black"/>
                </g>
                </g>
                <g id="trapsfront">
                <path id="Traps" d="M148.5 130C162.776 123.336 169.598 118.605 178 107C184.899 127.894 189.006 133.311 196.5 138.5C193.892 108.022 191.613 92.4226 178 82C199.508 95.8382 209.957 94.9211 226.5 82C215.713 93.6798 212.206 106.59 209.5 138.5C217.779 128.307 222.014 122.17 225.5 107C238.377 118.25 245.699 123.432 259 130C246.606 138.522 236.097 141.172 212.5 143C207.746 143.063 205.507 143.95 203 148.5C201.25 145.331 200.013 143.686 193.5 143C173.03 142.634 163.082 139.945 148.5 130Z"fill={(highlightedMuscle.includes("trap")) ? "red" : "none"} stroke="black"/>
                </g>
                <g id="chest">
                <path id="left" d="M202.5 149.5C199.939 145.557 197.994 144.093 193.5 143C141.066 139.038 126.976 145.332 130.5 172.5C138.875 202.173 145.812 214.348 166 220.5C183.295 221.137 191.517 220.522 202.5 217V149.5Z" fill={(highlightedMuscle.includes("chest") || checklist.benchPress) ? "red" : "none"} stroke="black"/>
                <path id="right" d="M203 149.5C205.354 145.167 207.086 144.024 210.5 143C248.834 141.361 269.491 140.933 276 158C276.645 192.257 264.15 213.328 239.5 220C225.283 220.774 217.29 220.124 203 217.5V149.5Z" fill={(highlightedMuscle.includes("chest") || checklist.benchPress) ? "red" : "none"} stroke="black"/>
                </g>
                <g id="shouldersfront">
                <g id="Vector 3">
                <path d="M92.5 207.5C92.9399 156.06 94.6075 128.636 146.5 128.5C158.698 137.352 163.146 139.285 170.5 142C138.581 141.766 129.015 147.994 129.5 172.5C119.591 184.376 110.841 192.295 92.5 207.5Z" fill={(highlightedMuscle.includes("shoulder") || checklist.pullups) ? "red" : "none"}stroke="black"/>
                <path d="M230 142C244.976 135.365 255.973 130.216 262 128.5C308.848 129.355 319.268 148.648 312 207.5C312.233 208.017 304.406 200.407 276 172.5C280.315 145.489 265.501 142.025 230 142Z" fill={(highlightedMuscle.includes("shoulder") || checklist.pullups) ? "red" : "none"}stroke="black"/>
                </g>
                </g>
                <g id="biceps">
                <g id="Vector 4">
                <path d="M87 283.5C85.8599 248.134 83.7905 225.747 92.5 208C113.686 190.12 122.244 182.365 129.5 174C134.945 186.897 132.833 202.083 129.5 228.5C123.597 237.011 119.811 245.204 111.5 271C101.868 271.459 96.5111 274.745 87 283.5Z" fill={(highlightedMuscle.includes("bicep") || checklist.bicepCurls) ? "red" : "none"}stroke="black"/>
                <path d="M275 228.5C272.898 201.846 270.134 183.948 277 174C293.792 188.557 306.382 198.999 312.5 208C316.857 214.638 318.469 222.958 319.5 248C317.088 252.785 317.941 264.886 319.418 285.837L319.5 287C316.005 280.924 311.874 277.452 296 271C289.094 252.245 284.667 241.671 275 228.5Z" fill={(highlightedMuscle.includes("bicep") || checklist.bicepCurls) ? "red" : "none"}stroke="black"/>
                </g>
                </g>
                <g id="forearms">
                <path id="Vector 5" d="M52 370.5C52 370.5 48 372.5 48 367.5C48 362.5 61.5107 272.631 83.5 251C87.7477 250.566 86.6965 265.121 86 286M52 370.5C62.409 330.402 69.035 309.875 86 286M52 370.5C53.9697 382.307 58.4063 382.312 69 377C89.1995 332.859 112.669 296.93 112 272C102.886 271.513 97.1001 275.114 86 286M321 289.5C312.324 278.667 306.752 273.966 293.5 272C289.251 279.752 307.725 312.848 336 374.5C345.037 380.59 349.156 380.393 354 370.5M321 289.5C317.789 264.918 317.502 254.898 321 247C344.057 281.639 350.226 312.237 359 370.5C359 370.5 356.5 373 354 370.5M321 289.5C336.754 310.944 343.886 329.013 354 370.5" fill={(highlightedMuscle.includes("forearm") || checklist.hammerCurls || checklist.pullups) ? "red" : "none"} stroke="black"/>
                </g>
                <g id="quads">
                <g id="Vector 6">
                <path d="M138 502C128.477 452.595 121.009 425.101 144.5 372.5C151.472 411.845 156.944 432.014 170 464C173.132 473.775 167.236 498.736 158 540C152.728 544.643 149.772 545.772 144.5 540C145.076 526.723 144.016 518.585 138 502Z" fill={(highlightedMuscle.includes("quad") || checklist.squats || checklist.deadLift) ? "red" : "none"} stroke="black"/>
                <path d="M234 469C249.096 426.105 256.864 414.498 259.5 372.5C275.919 403.953 285.486 421.052 268.5 502C264.718 510.927 262.813 520.704 259.5 540C254.228 544.812 251.272 546.12 246 540C244.759 522.909 242.118 507.351 234 469Z" fill={(highlightedMuscle.includes("quad") ||checklist.squats || checklist.deadLift)? "red" : "none"} stroke="black"/>
                </g>
                </g>
                <g id="obliques">
                <path d="M165.5 221C155.492 216.52 150.115 212.45 141 202C138.939 203.421 138.859 207.261 138.5 213.5C148.744 222.955 154.697 226.153 165.5 230V221Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M165.5 231.5C154.782 227.692 148.841 224.594 138.5 215.5C137.872 217.331 137.767 221.934 137.5 229C147.737 240.262 153.793 245.278 165.5 250.5V231.5Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M165.5 252.5C153.336 247.058 147.282 242.286 137.5 231.5V248.5C149.041 258.671 155.417 264.128 165.5 270.5V252.5Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M165.5 272.5C154.853 265.698 148.664 260.517 137.5 250.5C139.103 258.983 140.236 263.837 142.5 272.5C146.435 276.562 151.968 280.539 165.5 289.5V272.5Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M165.5 292C159.444 288.451 154.474 284.798 142.5 275V293C147.136 297.993 152.605 302.266 165.5 311.5V292Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M165.5 313.5C162.233 312.497 157.917 309.486 142.5 296.5C138.052 320.687 138.698 327.111 139 340.5C154.145 352.598 161.456 359.896 172 374C167.816 354.021 166.596 340.324 165.5 313.5Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M265 202C258.282 211.754 252.906 215.68 240.5 220L241 228.5C251.427 225.34 257.137 222.423 267 214.5C266.592 207.838 266.34 204.213 265 202Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M267 216.5C256.941 224.772 251.235 227.29 241 230V250.5C252.182 244.544 258.233 240.196 268.5 230C268.745 226.064 268.716 223.589 267 216.5Z"fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"} stroke="black"/>
                <path d="M268.5 231.5C259.066 241.88 253.005 246.415 241 252.5L240.5 269.5C251.975 262.646 258.032 257.863 268.5 248.5C269.621 244.324 269.758 240.902 268.5 231.5Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M267.5 251C257.916 260.29 252.08 264.88 240.5 271.5L241 289.5C249.834 283.892 254.886 279.799 264 271.5C266.886 262.911 267.963 258.304 267.5 251Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M264 273.5C255.153 281.665 250.164 285.961 241 291V311.5C248.789 306.23 253.482 302.543 262.5 294.5C263.757 288.505 264.177 284.208 264 273.5Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                <path d="M262.5 296.5L240.5 314.5C239.807 341.94 238.693 355.224 235 374C244.934 361.205 251.686 353.909 267.5 340.5C267.598 319.493 266.836 309.238 262.5 296.5Z" fill={(highlightedMuscle.includes("oblique")) ? "red" : "none"}stroke="black"/>
                </g>
                <g id="upperAbs">
                <g id="Vector 8">
                <path d="M202 217C188.873 221.365 180.917 221.644 166 219.5C165.619 240.307 166.049 247.976 167 260.5C184.557 247.277 191.162 242.814 202 241V217Z" fill={(highlightedMuscle.includes("upperab")) ? "red" : "none"}stroke="black"/>
                <path d="M204.5 241V217C217.981 221.679 225.669 222.155 239.5 221C240.644 231.403 240.602 239.474 238.5 260.5C226.676 250.45 219.274 246.111 204.5 241Z" fill={(highlightedMuscle.includes("upperab")) ? "red" : "none"}stroke="black"/>
                </g>
                </g>
                <g id="midAbs">
                <g id="Vector 9">
                <path d="M201.5 242C188.139 244.562 180.221 249.964 166 260.5C165.904 273.215 166.277 278.096 167 286.5C181.525 281.464 189.122 280.039 201.5 280.5V242Z" fill={(highlightedMuscle.includes("midab") || checklist.situps)? "red" : "none"} stroke="black"/>
                <path d="M204.5 280.5V242C220.018 248.031 227.065 252.581 238.5 261.5C239.324 269.378 239.094 275.378 238.5 286.5C226.777 281.077 219.217 279.993 204.5 280.5Z" fill={(highlightedMuscle.includes("midab") || checklist.situps) ? "red" : "none"}stroke="black"/>
                </g>
                </g>
                <g id="lowerAbs">
                <g id="Vector 10">
                <path d="M200.5 280.5C186.389 280.112 179.135 281.64 167 286.5V312.5H202C202.407 296.966 203.147 286.69 200.5 280.5Z" fill={(highlightedMuscle.includes("lowerab") || checklist.situps) ? "red" : "none"}stroke="black"/>
                <path d="M239 286.5C227.411 281.876 219.898 280.516 204.5 280.5C202.868 281.776 204.114 297.391 204.5 312.5H239V286.5Z" fill={(highlightedMuscle.includes("lowerab")||checklist.situps) ? "red" : "none"}stroke="black"/>
                <path d="M237.5 315.5H167C167.803 343.523 169.764 355.577 173.5 376.5C179.223 383.162 181.015 386.743 183 393C183.44 406.474 187.645 414.042 197 423C203.439 425.262 207.031 424.857 208.5 423C220.99 412.493 222.88 400.296 223.5 393C225.743 387.286 227.78 383.74 233.5 376.5C237.527 351.255 238.703 337.726 237.5 315.5Z" fill={highlightedMuscle.includes("lowerab") ? "red" : "none"}stroke="black"/>
                </g>
                </g>
                <g id="WholeBodyBack">
                <path id="Vector 11" d="M701.5 44.5C704.148 14.3432 709.445 2.45671 733.5 0.5C755.744 2.72615 762.802 11.389 762.5 44.5C766.464 42.5085 768.115 42.7483 770.5 44.5C770.833 62.654 768.785 68.307 760.5 69C755.404 76.3755 756.717 87.8199 757.5 105.5C770.234 125.546 777.858 127.451 791.5 130C834.273 125.937 845.127 143.377 843.5 206C849.689 220.356 849.033 230.295 849 247.5C857.491 254.545 860.801 260.874 866.5 272.5C884.64 317.478 878.969 353.707 898.5 385.5C913.726 386.767 921.542 395.016 934.5 420C929.469 425.218 922.544 415.321 910.5 406.5C921.343 439.071 935.115 449.964 927 452.5C920.276 452.429 914.515 437.354 905.5 426C902.047 434.012 918.205 460.105 914 463.5C903.668 463.064 901.279 440.215 894.5 430C893.67 444.247 900.556 463.353 897 466.5C886.749 464.011 889.429 442.584 883.5 429C879.218 439.31 882.168 456.194 878.5 457.5C873.329 455.96 872.992 443.929 875.5 424C867.834 405.344 866.089 394.82 865 376C841.986 328.994 829.206 302.75 825 272.5C818.957 250.36 814.11 241.34 804.5 227.5L792.5 272.5V295.5C799.057 309.743 798.459 319.303 797 336.5C807.391 362.367 809.336 384.998 812.5 426C814.94 467.125 811.558 490.724 799.5 533.5L802.5 582.5C808.464 623.472 809.028 645.572 800.5 682C794.503 704.276 792.989 719.918 794.5 755C799.865 763.825 800.082 769.892 798.5 781.5C807.408 784.388 807.624 788.266 801 798.5C800.944 802.716 800.248 805.278 798.5 810C789.048 814.961 783.256 816.171 770 809C769.037 805.789 768.754 803.792 770.5 798.5C762.983 778.123 760.758 767.338 770.5 752.5C769.621 708.866 764.66 686.504 755 647C755.829 642.278 764.006 592.854 761.5 592C763.993 591.093 739.689 504.957 737 429C733.64 423.945 731.848 423.066 729 429C727.086 481.128 719.281 520.241 704 592C704.352 617.111 707.063 627.357 711 647C701.509 686.225 697.134 708.977 693 752.5C706.493 752.014 698.523 801.169 695.5 798.5C695.5 798.5 696.398 802.414 695.5 808.5C684.538 814.363 677.978 814.436 665.5 808.5C664.621 804.709 664.243 802.539 664 798.5C664 798.5 657.779 784.628 666.5 781.5C665.975 767.444 666.869 761.342 671.5 755C673.39 725.802 671.783 709.91 666.5 682C656.858 646.557 655.605 625.012 663.5 582.5L666.5 533.5C653.091 495.896 652.882 471.17 652.52 428.34L652.5 426C656.293 388.274 657.588 366.102 668 336.5C667.887 316.345 668.011 305.389 673.5 295.5C672.367 287.199 672.026 282.368 673.5 272.5C666.351 242.57 662.376 223.174 659 227.5C647.671 242.771 644.739 253.164 641 272.5C642.124 298.818 622.937 329.698 599.5 376L598.5 398C597.522 407.924 595.27 413.688 591 424C590.549 441.679 591 460 586 457C581 454 586.175 429.385 581 430.5C575.584 431.547 576.745 459.823 568 466C565.989 460.858 570.185 441.682 570.5 430.5C560.981 444.692 557.746 465.5 550.5 463.5C548.461 450.572 557.996 433.989 560 426C548.313 445.64 537.5 459.5 536.5 452.5C535.5 445.5 550.518 425.222 555 406.5C544.275 418.598 538.31 424.979 529.5 421L542.5 402.5C551.463 389.401 557.39 387.558 568 384.5C578.818 373.83 581.78 357.669 586.5 327C590.324 281.065 598.834 268.112 615.5 248C615.959 228.095 616.69 217.683 623 207C620.323 150.316 626.675 127.477 676 130C690.344 128.119 698.222 121.17 708.5 105.5C708.949 89.5451 709.423 80.3341 706 69C703.502 70.0945 702.037 70.4096 699 69C696.049 63.931 694.851 59.3676 694.5 44.5C696.98 42.1933 698.497 42.0498 701.5 44.5Z" fill = {'pink'} stroke="black"/>
                </g>
                <g id="lats">
                <g id="Vector 12">
                <path d="M699.5 197C704.53 209.399 711.586 219.344 720.5 238.5C717.312 268.816 704.842 280.684 672.5 297C671.442 262.546 666.685 240.964 655.5 201C674.653 206.826 684.023 204.958 699.5 197Z" fill={(highlightedMuscle.includes("lat") || checklist.pullups) ? "red" : "none"}stroke="black"/>
                <path d="M811.5 201C793.078 206.54 783.452 206.167 768 197C759.617 211.879 754.441 221.016 744.5 238.5C757.57 273.695 768.046 285.721 791 297C796.747 256.943 799.514 233.966 811.5 201Z" fill={(highlightedMuscle.includes("lat") || checklist.pullups) ? "red" : "none"}stroke="black"/>
                </g>
                </g>
                <g id="lowerBack">
                <path id="Vector 13" d="M745 240H721.5C713.068 274.742 705.438 294.617 685 331C710.361 337.039 720.745 345.754 733 370C744.681 348.344 752.087 337.052 779.5 331C761.066 299.685 754.677 278.769 745 240Z" fill={(highlightedMuscle.includes("lowerback") || checklist.deadLift) ? "red" : "none"} stroke="black"/>
                </g>
                <g id="trapsback">
                <g id="Vector 14">
                <path d="M698.5 195.5C693.85 165.355 689.6 150.04 675 129.5C696.155 121.597 708.314 112.637 731 81.5V237C716.914 233.793 710.279 220.219 698.5 195.5Z" fill={(highlightedMuscle.includes("trap") || checklist.pullups) ? "red" : "none"}stroke="black"/>
                <path d="M735 237V81.5C751.313 105.735 761.324 118.241 788 129.5C779.983 143.384 774.96 156.575 764.5 195.5C757.541 213.959 755.65 225.301 735 237Z" fill={(highlightedMuscle.includes("trap")||checklist.pullups)? "red" : "none"}stroke="black"/>
                </g>
                </g>
                <g id="triceps">
                <g id="Vector 15">
                <path d="M842.5 206C830.388 196.917 824.14 189.736 813.5 175C812.638 193.818 810.729 205.574 805 228.5C817.256 243.617 820.7 253.766 823.5 273.5C839.587 265.154 848.894 265.239 866 273.5C862.121 261.588 858.79 255.646 849 247.5C849.702 225.182 848.64 215.414 842.5 206Z" fill={(highlightedMuscle.includes("tricep") || checklist.hammerCurls || checklist.benchPress) ? "red" : "none"} stroke="black"/>
                <path d="M661 224.5C655.589 207.583 653.604 197.411 652 178C643.999 188.497 637.363 194.683 623.5 206C616.487 214.484 616.648 226.626 616.5 247.5C607.866 254.849 603.815 260.201 599 273.5C615.346 267.067 624.191 266.293 639 273.5C644.782 251.296 649.118 240.042 661 224.5Z" fill={(highlightedMuscle.includes("tricep") || checklist.hammerCurls || checklist.benchPress)? "red" : "none"} stroke="black"/>
                </g>
                </g>
                <g id="shouldersback">
                <g id="Vector 16">
                <path d="M621 206C621.127 152.207 625.433 126.918 675 130L681 139.5C654.256 142.596 652.699 154.87 651.5 178C639.921 194.164 633.206 199.713 621 206Z" fill={(highlightedMuscle.includes("shoulder") || checklist.pullups) ? "red" : "none"}stroke="black"/>
                <path d="M842 207C846.057 143.41 833.061 128.114 788 130L784.5 139.5C806.386 142.513 813.687 149.126 812.5 175L842 207Z" fill={(highlightedMuscle.includes("shoulder") || checklist.pullups)? "red" : "none"}stroke="black"/>
                </g>
                </g>
                <g id="glutes">
                <g id="Vector 17">
                <path d="M729.5 368C715.799 336.956 701.714 331.037 668.5 335C659.14 364.105 656.787 384.841 655 425.5C687.843 453.876 703.923 452.121 729.5 425.5C732.582 396.262 732.714 383.382 729.5 368Z" fill={(highlightedMuscle.includes("glute") || checklist.deadLift) ? "red" : "none"} stroke="black"/>
                <path d="M737 368C747.632 340.437 758.864 331.316 795.5 335C807.16 361.453 807.994 384.284 809.46 424.403L809.5 425.5C782.066 448.145 766.498 456.028 737 425.5C733.835 403.924 732.735 391.64 737 368Z" fill={(highlightedMuscle.includes("glute")|| checklist.deadLift) ? "red" : "none"}stroke="black"/>
                </g>
                </g>
                <g id="hamstrings">
                <path id="Vector 18" d="M686.5 505.5C686.154 549.932 690.845 567.121 703.5 591C721.156 512.832 724.552 474.768 729.5 424.5C715.06 440.099 703.593 447.002 691.5 446.13M686.5 505.5C682.965 538.805 679.983 556.684 664.5 580.5V534C655.093 494.334 650.14 471.9 653.5 424.5C668.6 437.872 680.317 445.325 691.5 446.13M686.5 505.5L691.5 446.13M777.5 509.5C784.096 545.149 789.685 559.334 801 580.5C802.057 566.671 802.165 556.932 801 534C813.291 479.368 813.832 458.94 812 427C796.724 439.523 784.925 445.548 773 445.09M777.5 509.5C779.889 547.85 775.034 564.334 763 591C745.201 520.692 737.322 483.038 736.5 427C750.708 438.629 761.908 444.664 773 445.09M777.5 509.5L773 445.09" fill={(highlightedMuscle.includes("hamstring")||checklist.deadLift) ? "red" : "none"} stroke="black"/>
                </g>
                <g id="calves">
                <path id="Vector 19" d="M682 583C679.508 574.712 677.912 570.494 672.5 568.5C667.182 571.034 665.486 573.989 663.5 580.5C657.75 617.999 654.998 639.163 665.5 681.5C673.319 679.842 676.376 676.652 679.5 667M682 583C686.123 575.598 688.425 572.204 692.5 568.5C698.514 575.646 699.856 581.808 703 592C708.381 611.063 708.783 623.944 710 646.5C709.736 661.846 707.821 671.345 703 689C689.403 688.674 685.374 681.77 679.5 667M682 583L679.5 667M783 583C780.059 576.019 778.132 572.42 772.5 568.5C768.39 574.688 766.262 580.739 762.5 592C761.014 612.175 759.724 623.795 754.5 646.5C756.985 666.302 759.103 673.773 762.5 689C774.184 687.289 779.637 684.278 783 667M783 583C784.525 575.093 786.055 571.112 792.5 566.5C798.761 572.022 800.533 575.859 803 583C807.982 617.268 810.628 636.582 800 681.5C791.775 681.297 788.183 677.672 783 667M783 583V667" fill={(highlightedMuscle.includes("calf"))  ? "red" : "none"} stroke="black"/>
                </g>
                </svg>

                </div>
            <div className = "checklist">
                <h2>Design Your Workout</h2>
                {Object.keys(checklist).map((key) => (
                <div className = "item" key = {key}>
                    <input type = "checkbox" name = {key} id = {key} checked = {checklist[key]} onChange = {handleCheck}/>
                        <label htmlFor = {key}>{formatWorkoutName(key)} </label>
                        {!key.includes("_")/*checklist[key]*/ && (
                            <a href={getWorkoutLink(key)} target="_blank" rel="noopener noreferrer">
                                <img src={getWorkoutLink(key)} alt={key} style={{ width: "20px", height: "20px" }} />
                            </a>
                        )}
                        
                </div>
                ))}
            </div>
            
            {highestCount > 0 && (
            <div className="message">
            <p>
                {highestCategory === "arm" && "TODAY IS ARM DAY"}
                {highestCategory === "leg" && "TODAY IS LEG DAY"}
                {highestCategory === "core" && "TODAY IS CORE DAY"}
                {highestCategory === "chest" && "TODAY IS CHEST DAY"}
                {highestCategory === "back" && "TODAY IS BACK DAY"}
            </p>
            </div>
            )}

            <div className = "userAdd">
                <h2> Add your own workout</h2>
                <input 
                    type = "text" id = "workoutName" value = {newWorkout} placeholder = "What is it called?" onChange = {(e) => setNewWorkout(e.target.value)}
                    />
                <div className="muscleGroups">
                    <label>
                        <input
                        type="checkbox" value="neck" checked={selectedMuscleGroup.includes("neck")} onChange={handleMuscleGroupChange}/>
                        Neck
                    </label>
                    <label>
                        <input type="checkbox" value="bicep" checked={selectedMuscleGroup.includes("bicep")} onChange={handleMuscleGroupChange}/>
                        Biceps
                    </label>
                    <label>
                        <input type="checkbox"value="hamstring" checked={selectedMuscleGroup.includes("hamstring")} onChange={handleMuscleGroupChange}
                        />
                        Hamstrings
                    </label>
                    <label>
                        <input type="checkbox" value="tricep" checked={selectedMuscleGroup.includes("tricep")} onChange={handleMuscleGroupChange}/>
                        Triceps
                    </label>
                    <label>
                        <input type="checkbox" value="quad" checked={selectedMuscleGroup.includes("quad")} onChange={handleMuscleGroupChange}/>
                        Quads
                    </label>
                    <label>
                        <input type="checkbox" value="lat" checked={selectedMuscleGroup.includes("lat")} onChange={handleMuscleGroupChange}/>
                        Lats
                    </label>
                    <label>
                        <input type="checkbox" value="glute" checked={selectedMuscleGroup.includes("glute")} onChange={handleMuscleGroupChange}/>
                        Glutes
                    </label>
                    <label>
                        <input type="checkbox" value="calf" checked={selectedMuscleGroup.includes("calf")} onChange={handleMuscleGroupChange}/>
                        Calves
                    </label>
                    <label>
                        <input type="checkbox" value="trap" checked={selectedMuscleGroup.includes("trap")} onChange={handleMuscleGroupChange}/>
                        Traps
                    </label>
                    <label>
                        <input type="checkbox" value="chest" checked={selectedMuscleGroup.includes("chest")} onChange={handleMuscleGroupChange}/>
                        Chest
                    </label>
                    <label>
                        <input type="checkbox" value="forearm" checked={selectedMuscleGroup.includes("forearm")} onChange={handleMuscleGroupChange}/>
                        Forearms
                    </label>
                    <label>
                        <input type="checkbox" value="upperab" checked={selectedMuscleGroup.includes("upperab")} onChange={handleMuscleGroupChange}/>
                        Upper Abs 
                    </label>
                    <label>
                        <input type="checkbox" value="midab" checked={selectedMuscleGroup.includes("midab")} onChange={handleMuscleGroupChange}/>
                        Mid Abs 
                    </label>
                    <label>
                        <input type="checkbox" value="lowerab" checked={selectedMuscleGroup.includes("lowerab")} onChange={handleMuscleGroupChange}/>
                        Lower Abs 
                    </label>
                    <label>
                        <input type="checkbox" value="oblique" checked={selectedMuscleGroup.includes("oblique")} onChange={handleMuscleGroupChange}/>
                        Obliques 
                    </label>
                    <label>
                        <input type="checkbox" value="lowerback" checked={selectedMuscleGroup.includes("lowerback")} onChange={handleMuscleGroupChange}/>
                        Lower Back 
                    </label>
                    <label>
                        <input type="checkbox" value="shoulder" checked={selectedMuscleGroup.includes("shoulder")} onChange={handleMuscleGroupChange}/>
                        Shoulders
                    </label>
                    </div>    
                <button onClick = {handleAddWorkout}>Add</button>
            </div>
        </div>
    );
};