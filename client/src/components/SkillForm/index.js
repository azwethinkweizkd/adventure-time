import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Playground() {
  // const defaultProps = {
  //   options: top100Films,
  //   getOptionLabel: (option) => option.title,
  // };

  // const flatProps = {
  //   options: top100Films.map((option) => option.title),
  // };

  // const [value, setValue] = React.useState(null);

  const [parkNames, setParkNames] = useState([]);

  useEffect(() => {
    axios.get("/natParkSearch").then((res) => {
      setParkNames(res.data);
    });
  }, []);

  const category = [
    { label: "camping" },
    { label: "hiking" },
    { label: "trail running" },
    { label: "skiing" },
    { label: "snowboarding" },
    { label: "surfing" },
    { label: "kayaking" },
    { label: "snorkeling" },
    { label: "skydiving" },
    { label: "rock climbing" },
  ];

  const skiResorts = [
    { label: "49 Degrees North" },
    { label: "Afton Alps" },
    { label: "Alpine Meadows" },
    { label: "Alpine Mountain" },
    { label: "Alpine Valley" },
    { label: "Alpine Valley Resort" },
    { label: "Alta" },
    { label: "Alta Sierra" },
    { label: "Alyeska Resort" },
    { label: "Andes Tower Hills" },
    { label: "Angel Fire" },
    { label: "Antelope Butte" },
    { label: "Anthony Lakes" },
    { label: "Appalachian" },
    { label: "Apple Mountain" },
    { label: "Arapahoe Basin" },
    { label: "Arctic Valley" },
    { label: "Arizona Snowbowl" },
    { label: "Arrowhead" },
    { label: "Ascutney Mountain" },
    { label: "Aspen / Snowmass" },
    { label: "Aspen Highlands" },
    { label: "Aspen Mountain - Ajax" },
    { label: "Attitash" },
    { label: "Ausblick Ski Area" },
    { label: "Badger Mountain Ski Area" },
    { label: "Badger Pass" },
    { label: "Bald Mountain" },
    { label: "Balsams/Wilderness" },
    { label: "Bear Creek" },
    { label: "Bear Lodge Resort" },
    { label: "Bear Mountain" },
    { label: "Bear Mountain Valley Resort" },
    { label: "Bear Paw Ski Bowl" },
    { label: "Bear River Mountains (Naomi Peak)" },
    { label: "Bear Valley" },
    { label: "Bear's Den Mountain" },
    { label: "Bears Den" },
    { label: "Beartooth Pass" },
    { label: "Beaver Creek" },
    { label: "Beaver Mountain" },
    { label: "Beech Mountain Ski Resort" },
    { label: "Belleayre" },
    { label: "Berkshire East" },
    { label: "Big Air Green Valley Snowboard Park / Ski Green Valley" },
    { label: "Big Boulder" },
    { label: "Big Horn" },
    { label: "Big Mountain" },
    { label: "Big Powderhorn" },
    { label: "Big Rock Ski Area" },
    { label: "Big Squaw" },
    { label: "Bigrock" },
    { label: "Bittersweet" },
    { label: "Black Mountain" },
    { label: "Blackjack" },
    { label: "Blacktail Mountain" },
    { label: "Blandford" },
    { label: "Blue Hills" },
    { label: "Blue Knob" },
    { label: "Blue Marsh" },
    { label: "Blue Mountain" },
    { label: "Bluewood" },
    { label: "Bobcat Ski Center" },
    { label: "Bogus Basin" },
    { label: "Bolton Valley" },
    { label: "Boreal" },
    { label: "Boston Mills/Brandywine" },
    { label: "Bottineau Winter Park" },
    { label: "Bousquet" },
    { label: "Boyce Park" },
    { label: "Boyne Highlands" },
    { label: "Boyne Mountain" },
    { label: "Bradford" },
    { label: "Brantling Ski Slopes" },
    { label: "Brasstown Bald" },
    { label: "Breckenridge" },
    { label: "Bretton Woods" },
    { label: "Brian Head" },
    { label: "Bridger Bowl" },
    { label: "Brighton" },
    { label: "Bristol Mountain" },
    { label: "Bromley Mountain" },
    { label: "Bruce Mound Ski Area" },
    { label: "Brundage" },
    { label: "Bryce Resort" },
    { label: "Buck Hill" },
    { label: "Buckhorn Ski Club" },
    { label: "Buena Vista" },
    { label: "Buffalo Ski Club" },
    { label: "Burke Mountain" },
    { label: "Buttermilk" },
    { label: "Caberfae Peaks" },
    { label: "Camden Snow Bowl" },
    { label: "Camp 10" },
    { label: "Campgaw Mtn" },
    { label: "Campton" },
    { label: "Canaan Valley" },
    { label: "Cannon Mountains" },
    { label: "Cannonsburg" },
    { label: "Canyons Resort" },
    { label: "Cascade Mountain" },
    { label: "Cataloochee" },
    { label: "Catamount" },
    { label: "Cazenovia Ski Club" },
    { label: "Chester Ski Bowl" },
    { label: "Chestnut Mountain" },
    { label: "China Peak" },
    { label: "Chisos Mountains" },
    { label: "Christie Mountain" },
    { label: "Christmas Mountain" },
    { label: "Clear Fork" },
    { label: "Cloudmont" },
    { label: "Cochran Ski Area" },
    { label: "Cockaigne" },
    { label: "Coffee Mill" },
    { label: "Cooper Spur" },
    { label: "Copper Mountain" },
    { label: "Coppervale" },
    { label: "Cortina Mountain Resort" },
    { label: "Cranmore" },
    { label: "Crested Butte" },
    { label: "Crotched Mountain" },
    { label: "Crystal Ridge" },
    { label: "Cuchara Mountain" },
    { label: "Dartmouth Skiway" },
    { label: "Deer Mountain" },
    { label: "Deer Valley" },
    { label: "Detroit Mountain Ski Area" },
    { label: "Devil's Head" },
    { label: "Devil's Head Resort" },
    { label: "Diamond Lake Resort" },
    { label: "Diamond Peak" },
    { label: "Discovery" },
    { label: "Dodge Ridge" },
    { label: "Donner Ski Ranch" },
    { label: "Dry Hill" },
    { label: "Durango" },
    { label: "Eagle Point" },
    { label: "Eagle Rock" },
    { label: "Eaglecrest" },
    { label: "Eaton Mountain" },
    { label: "Echo Mountain Park" },
    { label: "Echo Valley Ski Area" },
    { label: "Eldora" },
    { label: "Elk Meadows" },
    { label: "Elk Mountain" },
    { label: "Elk Ridge" },
    { label: "Elko Snobowl Ski & Winter Recreation Area" },
    { label: "Elm Creek Park Reserve" },
    { label: "Enchanted Forest" },
    { label: "Estes Park" },
    { label: "Ferguson Ridge" },
    { label: "Four Lakes Village" },
    { label: "Four Seasons" },
    { label: "Frost Fire" },
    { label: "Fun Valley" },
    { label: "Giants Ridge" },
    { label: "Gladstone Sports Park" },
    { label: "Gore Mountain" },
    { label: "Gorgoza Park" },
    { label: "Grand Geneva Resort and Spa" },
    { label: "Grand Targhee" },
    { label: "Granite Gorge Ski Resort" },
    { label: "Granite Peak" },
    { label: "Granlibakken" },
    { label: "Great Bear" },
    { label: "Great Divide" },
    { label: "Greek Peak" },
    { label: "Gunstock" },
    { label: "Hanson Hills" },
    { label: "Hawksnest" },
    { label: "Haystack" },
    { label: "Heavenly" },
    { label: "Hermon Mountain" },
    { label: "Hesperus Ski Area" },
    { label: "Hickory Hills" },
    { label: "Hickory Ski Center" },
    { label: "Hidden Valley - MO" },
    { label: "Hidden Valley - NJ" },
    { label: "Hidden Valley - PA" },
    { label: "Highlands of Olympia" },
    { label: "Hilltop" },
    { label: "Hocking Hills" },
    { label: "Hogadon" },
    { label: "Holiday Mountain" },
    { label: "Holiday Valley" },
    { label: "HoliMont" },
    { label: "Homewood" },
    { label: "Hoodoo" },
    { label: "Howelsen" },
    { label: "Huff Hills" },
    { label: "Hunt Hollow" },
    { label: "Hunter Mountain" },
    { label: "Hurricane Ridge" },
    { label: "Hyland Ski & Snowboard" },
    { label: "Indianhead" },
    { label: "Jack Frost" },
    { label: "Jackson Hole" },
    { label: "Jay Peak" },
    { label: "Jiminy Peak" },
    { label: "June" },
    { label: "Kelly Canyon" },
    { label: "Kendall Mountain" },
    { label: "Kettlebowl" },
    { label: "Keystone" },
    { label: "Killington" },
    { label: "King Pine" },
    { label: "Kirkwood" },
    { label: "Kissing Bridge" },
    { label: "Labrador Mountain" },
    { label: "Las Vegas Ski" },
    { label: "Laurel Mountain" },
    { label: "Leavenworth Ski Resort" },
    { label: "Liberty Mountain" },
    { label: "Little Ski Hill Snow Resort" },
    { label: "Little Switzerland" },
    { label: "Lookout Pass" },
    { label: "Loon Mountain" },
    { label: "Lost Trail" },
    { label: "Lost Valley" },
    { label: "Loup Loup" },
    { label: "Loveland" },
    { label: "Lutsen Mountain" },
    { label: "Mad River" },
    { label: "Mad River Glen" },
    { label: "Magic Mountain Resort" },
    { label: "Mammoth" },
    { label: "Maple Ski Ridge" },
    { label: "Marquette" },
    { label: "Marshall Mountain" },
    { label: "Massanutten" },
    { label: "Mauna Kea" },
    { label: "Maverick" },
    { label: "McCauley" },
    { label: "McIntyre Ski Area" },
    { label: "Middlebury College Snow Bowl" },
    { label: "Missaukee Mountain" },
    { label: "Mission Ridge" },
    { label: "Mohawk Mountain" },
    { label: "Monarch" },
    { label: "Mont du Lac Ski Area" },
    { label: "Mont Dulac" },
    { label: "Mont Ripley" },
    { label: "Montage" },
    { label: "Montana Snowbowl" },
    { label: "Montecito Sequoia Resort" },
    { label: "Moonlight Basin" },
    { label: "Moose Mountain" },
    { label: "Mount Abram" },
    { label: "Mount Abram" },
    { label: "Mount Airy Lodge" },
    { label: "Mount Ashwabay Ski Area" },
    { label: "Mount Bohemia" },
    { label: "Mount Bohemia (Michigan)" },
    { label: "Mount Brighton" },
    { label: "Mount Eyak" },
    { label: "Mount Frontenac" },
    { label: "Mount Hood Meadows Ski Resort" },
    { label: "Mount Jefferson Ski Area" },
    { label: "Mount Katahdin" },
    { label: "Mount Kato" },
    { label: "Mount Kato" },
    { label: "Mount La Crosse" },
    { label: "Mount Marcy" },
    { label: "Mount Pleasant" },
    { label: "Mount Rainier" },
    { label: "Mount Shasta Ski Park" },
    { label: "Mount Snow" },
    { label: "Mount Sunapee" },
    { label: "Mount Tone" },
    { label: "Mountain Creek" },
    { label: "Mountain High" },
    { label: "Mountain High Resort" },
    { label: "Mountain Top at Grand Geneva" },
    { label: "Mountainview Ski Area" },
    { label: "Mt Abram" },
    { label: "Mt Ashland" },
    { label: "Mt Aurora Skiland" },
    { label: "Mt Bachelor" },
    { label: "Mt Bailey Snowcat Skiing" },
    { label: "Mt Baker" },
    { label: "Mt Baldy" },
    { label: "Mt Brighton" },
    { label: "Mt Crescent" },
    { label: "Mt Holiday" },
    { label: "Mt Holly" },
    { label: "Mt Hood Meadows" },
    { label: "Mt Hood Skibowl" },
    { label: "Mt Jefferson" },
    { label: "Mt LaCrosse" },
    { label: "Mt Lemmon Ski Valley" },
    { label: "Mt Peter" },
    { label: "Mt Rose" },
    { label: "Mt Shasta" },
    { label: "Mt Southington" },
    { label: "Mt Spokane" },
    { label: "Mt Zion" },
    { label: "Mt. Aurora Skiland Ski Area" },
    { label: "Mt. McSauba" },
    { label: "Mt. Waterman" },
    { label: "Mulligan's Hollow Ski Bowl" },
    { label: "Mystic Mountain" },
    { label: "Nashoba Valley" },
    { label: "New Hermon" },
    { label: "New Winterplace" },
    { label: "Nordic Mountain" },
    { label: "Nordic Valley" },
    { label: "Northstar at Tahoe" },
    { label: "Norway Mountain" },
    { label: "Nub's Nob Ski Area" },
    { label: "Nubs Nob" },
    { label: "Oak Mountain" },
    { label: "Ober Gatlinburg" },
    { label: "Oglebay Park Ski Area" },
    { label: "Okemo Mountain" },
    { label: "Otis Ridge" },
    { label: "Otsego" },
    { label: "Pajarito" },
    { label: "Pando Winter Sports Park" },
    { label: "Paoli Peaks" },
    { label: "Park City" },
    { label: "Pats Peak" },
    { label: "Pebble Creek" },
    { label: "Peek 'n Peak" },
    { label: "Peek'n Peak Resort" },
    { label: "Perfect North Slopes" },
    { label: "Pico" },
    { label: "Pico Mtn at Killington" },
    { label: "Pine Creek Ski Area" },
    { label: "Pine Knob" },
    { label: "Pine Mountain" },
    { label: "Pine Ridge Snow Park" },
    { label: "Pineridge Cross-Country" },
    { label: "Pines Peak" },
    { label: "Plattekill Mountain" },
    { label: "Plumas - Eureka Ski Bowl" },
    { label: "Pomerelle" },
    { label: "Porcupine Mountains" },
    { label: "Powder Mountain" },
    { label: "Powderhorn" },
    { label: "Quechee Lakes" },
    { label: "Ragged Mountain" },
    { label: "Raging Buffalo Snowboard Park" },
    { label: "Red Lodge" },
    { label: "Red River" },
    { label: "Riverside Hills" },
    { label: "Royal Gorge" },
    { label: "Royal Mountain" },
    { label: "Saddleback" },
    { label: "Sandia Peak" },
    { label: "Santa Fe Ski Area" },
    { label: "Sapphire Valley" },
    { label: "Sawkill Family Ski Center" },
    { label: "Sawtooth Mountains" },
    { label: "Schweitzer Mountain" },
    { label: "Scotch Valley Resort" },
    { label: "Seven Oaks" },
    { label: "Seven Springs" },
    { label: "Shanty Creek" },
    { label: "Shawnee Mountain" },
    { label: "Shawnee Peak" },
    { label: "Shirley Meadows" },
    { label: "Showdown" },
    { label: "Sierra at Tahoe" },
    { label: "Sierra Summit" },
    { label: "Silver Ridge" },
    { label: "Silverton Mountain" },
    { label: "Sipapu" },
    { label: "Sitzmark Lifts" },
    { label: "Ski Apache" },
    { label: "Ski Beech" },
    { label: "Ski Big Bear" },
    { label: "Ski Bradford" },
    { label: "Ski Brule" },
    { label: "Ski Brule / Ski Homestead" },
    { label: "Ski Butternut" },
    { label: "Ski Cloudcroft" },
    { label: "Ski Cooper" },
    { label: "Ski Denton" },
    { label: "Ski Green Valley" },
    { label: "Ski Gull Ski Area" },
    { label: "Ski Mystic Deer Mountain" },
    { label: "Ski Plattekill" },
    { label: "Ski Roundtop" },
    { label: "Ski Santa Fe" },
    { label: "Ski Sawmill" },
    { label: "Ski Snowstar" },
    { label: "Ski Sundown" },
    { label: "Ski Sunrise" },
    { label: "Ski Tamarack" },
    { label: "Ski Ward" },
    { label: "Sky Tavern" },
    { label: "Sky Valley" },
    { label: "Skyline" },
    { label: "Sleeping Giant" },
    { label: "Sleepy Hollow Sports Park" },
    { label: "Smugglers Notch" },
    { label: "Sno Mountain" },
    { label: "Snow Creek" },
    { label: "Snow Hill at Eastman" },
    { label: "Snow King" },
    { label: "Snow Ridge" },
    { label: "Snow Snake" },
    { label: "Snow Summit" },
    { label: "Snow Trails" },
    { label: "Snow Valley" },
    { label: "Snowbasin" },
    { label: "Snowbird" },
    { label: "Snowcrest at Kratka Ridge" },
    { label: "Snowhaven" },
    { label: "Snowmass" },
    { label: "Snowshoe Mountain" },
    { label: "Snowy Range" },
    { label: "Snowy Range Ski Area" },
    { label: "SnÃ¶ Mountain" },
    { label: "Soda Springs" },
    { label: "Soldier Mountain" },
    { label: "Solitude" },
    { label: "SolVista" },
    { label: "Song Mountain" },
    { label: "Spirit Mountain" },
    { label: "Split Rock Snow Ski Resort" },
    { label: "Spout Springs" },
    { label: "Spring Mountain" },
    { label: "Springer Mountain" },
    { label: "Squaw Valley USA" },
    { label: "Steamboat" },
    { label: "SteepleChase" },
    { label: "Sterling Forest" },
    { label: "Stevens Pass" },
    { label: "Storrs Hill" },
    { label: "Stover Mountain" },
    { label: "Stowe" },
    { label: "Stratton Mountain" },
    { label: "Sugar Bowl" },
    { label: "Sugar Loaf" },
    { label: "Sugar Mountain" },
    { label: "Sugarbush" },
    { label: "Sugarloaf/USA" },
    { label: "Suicide Six" },
    { label: "Summit Central at Snoqualmie" },
    { label: "Summit East at Snoqualmie" },
    { label: "Summit Ski Area" },
    { label: "Summit West at Snoqualmie" },
    { label: "Sun Valley" },
    { label: "Sunburst" },
    { label: "Sundance" },
    { label: "Sunday River" },
    { label: "Sundown Mountain" },
    { label: "Sunlight" },
    { label: "Sunrise Park" },
    { label: "Swain" },
    { label: "Swiss Valley" },
    { label: "Sylvan Hill Park" },
    { label: "Tahoe Donner" },
    { label: "Tamarack" },
    { label: "Tanglwood" },
    { label: "Taos" },
    { label: "Telemark" },
    { label: "Telluride" },
    { label: "Tenney Mountain" },
    { label: "Terry Peak" },
    { label: "Teton Pass" },
    { label: "The Balsams  Wilderness" },
    { label: "The Canyons" },
    { label: "The Granby Ranch" },
    { label: "The Homestead" },
    { label: "The Mount Washington Resort at Bretton Woods" },
    { label: "The Mountain Top at Grand Geneva Resort" },
    { label: "The Summit - at - Snoqualmie" },
    { label: "Thunder Ridge" },
    { label: "Timber Ridge" },
    { label: "Timberline Four Seasons" },
    { label: "Timberline Ski Resort" },
    { label: "Titcomb Mountain" },
    { label: "Titus Mountain" },
    { label: "Toggenburg" },
    { label: "Treetops" },
    { label: "Trollhaugen" },
    { label: "Turner Mountain" },
    { label: "Tussey Mountain" },
    { label: "Tuxedo Ridge at Sterling Forest" },
    { label: "Tyrol Basin" },
    { label: "Vail" },
    { label: "Villa Olivia" },
    { label: "Villa Roma" },
    { label: "Wachusett Mountain" },
    { label: "Warner Canyon" },
    { label: "Waterville Valley" },
    { label: "Welch Village" },
    { label: "West Mountain" },
    { label: "Whaleback Ski Area" },
    { label: "White Mountain Peak" },
    { label: "White Pass" },
    { label: "White Pine" },
    { label: "Whitecap Mountain" },
    { label: "Whiteface" },
    { label: "Whitefish" },
    { label: "Whitefish Mountain Resort" },
    { label: "Whitetail" },
    { label: "Wild Mountain" },
    { label: "Wildcat" },
    { label: "Wildcat Mountain" },
    { label: "Willamette Pass" },
    { label: "Willard Mountain" },
    { label: "Willowbrook Ski Area" },
    { label: "Wilmot Mountain" },
    { label: "Windham Mountain" },
    { label: "Windham Mtn" },
    { label: "Winter Park" },
    { label: "Winter Park Resort" },
    { label: "Wintergreen" },
    { label: "Winterplace" },
    { label: "Wisp" },
    { label: "Wolf Creek" },
    { label: "Wolf Creek Utah Resort" },
    { label: "Wolf Laurel" },
    { label: "Wolf Mountain" },
    { label: "Wolf Ridge Ski Resort" },
    { label: "Woodbury" },
    { label: "Woodbury Ski and Racquet Area" },
    { label: "Woodbury Ski Area" },
    { label: "Woods Valley" },
    { label: "Woods Valley Ski Area" },
    { label: "Yagoo Valley Ski Area" },
    { label: "Yawgoo Valley" },
    { label: "Yellowstone Club" },
    { label: "Yosemite's Badger Pass" },
  ];
  const options = [].concat(parkNames, skiResorts);
  console.log(options);
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        // {...defaultProps}
        id="disable-close-on-select"
        disableCloseOnSelect
        autoComplete={(parkNames, skiResorts)}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="National Park Visited"
            variant="standard"
          />
        )}
      />
      <Autocomplete
        // {...defaultProps}
        id="clear-on-escape"
        clearOnEscape
        autoComplete={category}
        options={category}
        renderInput={(params) => (
          <TextField {...params} label="Activities" variant="standard" />
        )}
      />
      <Button className="btn btn-info btn-block py-3" type="submit">
        Submit
      </Button>
    </Stack>
  );
}
