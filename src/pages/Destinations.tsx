import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { destinations } from "@/data/destinations";
// Real features and stories for each destination
const destinationEnhancements: Record<string, { features: string[]; story: string }> = {
  "masai-mara": {
    features: [
      "The Great Migration: Witness up to 1.5 million wildebeest, zebras, and gazelles crossing the Mara River in the spectacle of nature's most dramatic annual event",
      "Exceptional predator viewing: One of Africa's highest concentrations of lions, leopards, and cheetahs—ideal for photography and wildlife encounters",
      "Pristine ecosystem: Covers 1,510 square kilometers of intact savannah with diverse habitats from riverine forests to open plains",
      "Maasai cultural immersion: Home to the Maasai people, offering authentic visits to traditional warrior bomas and insights into pastoral life"
    ],
    story: "Masai Mara stands as the crown jewel of African safaris, where the rhythm of nature beats in thunderous hoofbeats and golden dust clouds. Each year, the phenomenon of the Great Migration transforms the landscape into a living stage where survival hangs in the balance—thousands of wildebeest and zebras navigate crocodile-filled rivers while prides of lions watch from the grasslands. The Mara's amber plains stretch endlessly beneath impossibly vast African skies, where every game drive reveals a new chapter: a cheetah sprint at dawn, a rare leopard in an acacia tree, or a family of elephants moving serenely through the bush. The reserve's rich tapestry weaves together Maasai heritage, untamed wilderness, and some of Earth's most thrilling wildlife theater into an experience that redefines what it means to truly connect with Africa."
  },
  "amboseli": {
    features: [
      "Mount Kilimanjaro backdrop: Stunning views of Africa's highest peak (19,341m) framed by elephant herds, creating iconic photography opportunities",
      "Africa's largest elephant population: Over 6,000 elephants concentrate around water sources, providing unparalleled elephant trekking and observation experiences",
      "Volcanic geology: Ancient lava flows and ash deposits create the park's distinctive gray landscape and nutrient-rich wetlands",
      "Ol Tukai wetlands: Swampy groundwater-fed oasis supporting dense wildlife concentrations in otherwise arid terrain"
    ],
    story: "Amboseli National Park is where Africa's most iconic peak meets Africa's most magnificent giants, creating a landscape of timeless beauty and raw wilderness. The snow-capped crown of Mount Kilimanjaro dominates the horizon, a constant sentinel over fields of red dust where earth-toned elephant herds move with ancient grace. This is the elephant's kingdom—a place where multi-generational matriarchs lead their families to hidden water sources, where countless tusks catch the afternoon light, and where photographer's dreams materialize at every turn. The park's stark volcanic terrain and scattered acacia trees frame scenes of intimate wildlife drama that have inspired conservationists and travelers for generations, creating memories that linger far longer than any photograph could capture."
  },
  "lamu": {
    features: [
      "UNESCO World Heritage Site: Lamu Town is East Africa's best-preserved Swahili settlement with 14th-century Arab-influenced architecture and narrow winding streets",
      "Living dhow culture: Traditional sailing boats remain central to life—learn sailing traditions and explore the archipelago under canvas and wind",
      "Isolated island tranquility: Limited vehicles and no airport keep this destination blissfully undiscovered, preserving authentic Swahili atmosphere",
      "Pristine white sand beaches: Pate Island and surrounding atolls offer powdery coastal beauty with excellent snorkeling and kiteboarding opportunities"
    ],
    story: "Lamu is a step backward through centuries, a place where time moves to the rhythm of the Indian Ocean tide and the call to prayer echoes through Arab stone buildings. The archipelago's main town is a living museum where donkeys outnumber cars, where dhow sailboats still line the harbor much as they have for 600 years, and where merchant traders' palaces testify to centuries of trade and cultural exchange. Wander through Lamu's shadowed alleyways adorned with intricate wooden doors and delicate balconies, relax on quiet beaches where few tourists have ventured, and experience Swahili culture with an authenticity found nowhere else on Kenya's coast. This is where your safari transforms into something deeper—a cultural awakening in a place that has resisted modernization and preserved the soul of the East African coast."
  },
  "tsavo": {
    features: [
      "Africa's largest park: Tsavo East and West combine to create 20,812 square kilometers of pristine wilderness with minimal development and few visitors",
      "Red elephant phenomenon: Famous red dust covers both elephants and landscape, creating striking safari photographs and a unique ecosystem signature",
      "Ancient volcanic landscape: Chyulu Hills, lava flows, and underground springs create dramatic geological formations and scenic beauty",
      "Remote and undisturbed: Far from tourist crowds, offering genuine wilderness experiences with higher predator-to-visitor ratios and authentic African adventure"
    ],
    story: "Tsavo is the wild Africa that exists in your imagination—vast, untamed, and refreshingly free from the complexities of tourism infrastructure. This colossal park draws you into genuine frontier territory where red dust hangs in the air like an ancient curse, where enormous bull elephants roam freely with tusks the size of logs, and where your game drive might discover lions that have never seen humans before. The landscape itself seems primordial: volcanic cones rise from crimson plains, underground springs nurture hidden oases, and at night the stars multiply across darkness so complete it feels like touching eternity. In Tsavo, you're not merely observing wildlife—you're witnessing Africa as it has existed for millennia, raw and unfiltered, a place that humbles even the most seasoned safari travelers."
  },
  "diani": {
    features: [
      "Coral reef ecosystem: Living coral gardens teeming with tropical fish, sea turtles, and marine biodiversity perfect for snorkeling just offshore",
      "Pristine white sand beaches: Powdery sand stretches for 15 kilometers along Kenya's southern coast, lined with casuarina trees for natural shade",
      "Warm year-round waters: Indian Ocean temperatures average 26°C, ideal for swimming, diving, and water sports throughout the year",
      "Integrated wildlife experiences: Nearby Shimba Hills National Reserve offers elephant sightings just 20 minutes inland, combining beach and safari in one trip"
    ],
    story: "Diani Beach is where the Indian Ocean's turquoise waters lap against Africa's finest sand, a place where underwater coral gardens match the vivacity of the tropical sky overhead. This 15-kilometer stretch of coastal paradise has long been a secret sanctuary for travelers seeking the perfect balance between adventure and pure relaxation, where mornings bring snorkeling among playful dolphins and evenings bring fresh grilled fish watched by the sun melting into the sea. The beach's natural casuarina shade provides respite from the sun while swaying palm trees and the constant rhythm of waves create an almost meditative atmosphere—a place where your safari dreams evolve into something more sensory and indulgent. Diani captures multiple African narratives in a single location: wildlife encounters, cultural immersion, world-class diving, and unapologetic beach luxury all woven together along one unforgettable coastline."
  },
  "serengeti": {
    features: [
      "The Great Migration: Witness the synchronized annual movement of 1.8 million wildebeest and zebras crossing between Tanzania and Kenya in one of nature's greatest spectacles",
      "Endless golden plains: 14,750 square kilometers of seemingly infinite savannah dotted with distinctive flat-topped acacia trees and wildlife-rich grasslands",
      "Exceptional big cat viewing: Densest population of lions, leopards, and other predators—Seronera Valley alone hosts 20-30 lion prides",
      "World Heritage Site: UNESCO recognition since 1981, protecting one of Earth's largest intact terrestrial ecosystems and evolutionary showcase"
    ],
    story: "The Serengeti is not merely a destination—it's a pilgrimage to the genesis of all wildlife experiences, where the earth itself seems alive with possibility and movement. The park's name means 'the land that runs forever' in Maasai, and standing in its endless golden grasslands, you understand why: the horizon dissolves into infinity, and nature's most primal dramas play out daily across a stage vast enough to make humans feel simultaneously insignificant and profoundly alive. The Great Migration's rumbling herds create a symphony of thunder and dust that builds throughout the year, while lions and leopards move like ghosts through the acacia-studded plains, their presence felt before they're seen. In the Serengeti, time collapses—you're witness to cycles that have unfolded unchanged for millennia, ancient rhythms unchanged by human history, a true window into what Africa was, is, and always will be."
  },
  "ngorongoro": {
    features: [
      "World's largest intact volcanic caldera: The 610-meter-deep crater creates a natural amphitheater spanning 8,288 square kilometers with self-contained ecosystem",
      "High animal density: Up to 25,000 large animals live year-round in the crater, including the black rhinoceros, making encounters highly probable",
      "Unique geological formation: The crater's sheer volcanic walls, freshwater lake, and fertile soda ash create a landscape found nowhere else on Earth",
      "Maasai pastoralists: Traditional herding communities coexist within the conservation area, preserving cultural traditions within this natural wonder"
    ],
    story: "The Ngorongoro Crater is nature's cathedral, a place where geology and biology converge in one of Earth's most surreal landscapes—a massive volcanic bowl so deep and so complete that it contains an entire world unto itself. Descending the crater's walls is like stepping into a hidden planet where 25,000 animals concentrate in a self-contained ecosystem, where lions hunt in the morning mist rising off the soda lake, and where Maasai herders move their cattle alongside Cape buffalo and zebras in extraordinary coexistence. The crater's scale defies comprehension—walking its rim reveals endless views of wildlife, volcano flanks, and the distant Serengeti plains beyond, while descending to the crater floor feels like entering a secret pocket of Africa where normal rules of space and abundance cease to apply. This is African drama distilled to its purest form: life and death, predator and prey, climate and resilience all compressed into a volcanic bowl that holds the continent's secrets."
  },
  "zanzibar": {
    features: [
      "Spice Island heritage: Historic clove plantations and fragrant spice markets reflect centuries of trade and Arab-Persian-Indian cultural fusion",
      "Stone Town UNESCO site: Winding narrow streets, a 250-year-old sultanate palace, and intricate Swahili architecture with Arab, Indian, and African influences",
      "Pristine tropical islands: White sand beaches, coral reefs, and crystal waters with excellent opportunities for diving, snorkeling, and dhow sailing",
      "Rich maritime history: Home to the monsoon trading system, Arabian Nights legends, and historical sites including the museum of the slave trade"
    ],
    story: "Zanzibar is intoxication without alcohol—a sensory feast where clove perfume drifts through bustling markets, where monsoon winds have carried traders and dreamers to these island shores for a thousand years, and where every shadowed alley in Stone Town whispers stories of sultans and merchant princes. This archipelago represents the sophisticated crossroads of Indian Ocean trade, where Swahili culture synthesized African, Arab, and Asian influences into something entirely unique—visible in the architecture's carved doors, the call to prayer echoing through ancient mosques, and the spices that once made these islands among the world's most sought-after territories. Beyond the historic cobbled streets lies island paradise: powdery beaches where your only company is occasionally a fisherman, turquoise waters perfect for exploring underwater kingdoms, and the freedom of a traditional dhow sailing beneath stars so bright they seem within reach. Zanzibar captures African adventure with sophistication and history—a place where luxury feels earned through cultural richness rather than material excess."
  },
  "kilimanjaro": {
    features: [
      "Africa's highest peak: At 5,895 meters, climbing Kilimanjaro represents Africa's most accessible high-altitude trekking experience for non-mountaineers",
      "Five distinct climate zones: Journey from tropical rainforest through alpine meadows to Arctic snow in a single expedition, experiencing Earth's varied ecosystems",
      "Crater summit views: Standing on Uhuru Peak offers perspectives of Tanzania's central plateau, the plains below, and Kenya's distant landscape across the Amboseli Basin",
      "Climbing culture: Multiple established routes with porters, guides, and facilities create a uniquely accessible African climbing experience"
    ],
    story: "Mount Kilimanjaro is Africa's quiet colossus, a snow-crowned giant rising incongruously from the Tanzanian plains, seemingly separate from the continent it crowns—a mountain that has called to adventurers, dreamers, and seekers for generations. The trek across its slopes is a compressed journey through climate and geography: beginning in misty rainforests thick with hidden wildlife, ascending through alpine meadows where giant groundsels stand like sentinels, and finally pushing toward the summit where thin air and freezing temperatures test your resolve as you climb toward Africa's highest point. The experience transforms each day into a pilgrimage through changing landscapes, where the mountain's scale slowly reveals itself with each ascending step, where the air itself grows lighter both physically and spiritually, and where nights beneath multiplying stars feel like reaching toward something transcendent. Summiting Kilimanjaro isn't primarily about conquering a mountain—it's about discovering what you're capable of when tested by altitude, isolation, and the profound privilege of standing atop a continent."
  },
  "tarangire": {
    features: [
      "Baobab-studded landscape: Ancient baobab trees dot the savannah, creating iconic silhouettes and providing seasonal food sources that concentrate wildlife",
      "Highest elephant density in Tanzania: Tarangire River concentrates elephants year-round, with some estimates suggesting 6,000 elephants in peak season",
      "Tarangire River ecosystem: Permanent flowing river creates wildlife density unmatched in other parks, with excellent predator-prey interactions on riverbanks",
      "Lower tourist volume: Significantly fewer visitors than northern circuit parks, providing authentic safari experiences and uncrowded game drives"
    ],
    story: "Tarangire National Park is where ancient baobabs stand as sentient guardians of the African bush, their enormous trunks holding stories of centuries while their gnarled branches reach skyward like primordial creatures frozen in place. The park's namesake river becomes a lifeline during dry seasons, concentrating thousands of elephants into scenes of elemental African beauty—massive tusked matriarchs leading their families to water while predators circle the riverbanks in ancient predator-prey choreography. This is Tanzania's elephant kingdom, a place where the landscape seems almost Jurassic, where you can encounter more elephants than people, where the relative absence of tourist crowds means your game drive is truly your own intimate experience. Tarangire offers a peculiar magic: the raw safari experience of northern Tanzania without its commercialism, authentic wilderness encounters with the dramatic backdrop of trees that have existed since your ancestors still roamed Africa."
  },
  "bwindi": {
    features: [
      "Mountain gorilla capital: Home to nearly 400 of the world's 1,000 remaining mountain gorillas in protected habitats where researchers have documented complex family structures",
      "Impenetrable rainforest: 331 square kilometers of primordial forest with 200+ tree species, creating a canopy so thick it provides perpetual dusk conditions",
      "Extraordinary biodiversity: Over 350 bird species, 120 mammal species including endangered forest elephants, and countless endemic and rare plant species",
      "Immersive trekking experience: Treks are intimate encounters combining physical challenge with profound probability of close gorilla family contact"
    ],
    story: "Bwindi Impenetrable Forest is where your African dream deepens into something spiritual—stepping into emerald depths where mist clings to ancient trees and the forest itself seems to hold its breath in anticipation of an encounter with its most powerful inhabitants. The trek through Bwindi's towering rainforest canopy is a journey through geological time: massive tree ferns, hidden streams, and such density of life that every sense becomes magnified and alive. When your guide signals and you finally glimpse a gorilla family moving through the vegetation—a silverback male, mothers and their offspring, the sociological reality of these magnificent creatures unfolding before your eyes—time crystallizes into a moment of profound connection between species, a reminder that we share this planet with intelligence and emotion that transcends our own. Bwindi offers more than a wildlife sighting; it's a humbling revelation of humanity's place within the natural world and an emotional experience that fundamentally shifts how you understand yourself as an inhabitant of Earth."
  },
  "queen-elizabeth": {
    features: [
      "Tree-climbing lions: Unique lion behavior found nowhere else—lions rest in acacia trees to escape ground insects, creating remarkable wildlife phenomena",
      "Kazinga Channel boat cruise: 40-kilometer freshwater channel connects two lakes, offering intimate water-based wildlife viewing with hippos, buffalo, and waterfowl",
      "Diverse habitats: Tropical forests, crater lakes, savannah, and wetlands create Tanzania-like variety within Uganda's most biodiverse park",
      "Bird watcher's paradise: Over 600 bird species documented, making it one of Africa's premier birding destinations with ibis, kingfishers, and rare eagles"
    ],
    story: "Queen Elizabeth National Park is Uganda's crown jewel, a place where the unexpected is ordinary—lions rest in tree branches like oversized house cats, hippos congregate in crystalline channels in jaw-dropping numbers, and the landscape shifts dramatically from crater-studded highlands to delta wetlands teeming with improbable abundance. A boat cruise down the Kazinga Channel is pure theatrical wildlife watching: every meter of shoreline reveals new drama as hippo pods surface, Cape buffalo herds drink at the water's edge, and countless birds create a symphony of calls that echoes across water. The park's diversity means each direction brings new habitats and new ecological stories—thick forests hiding forest elephants and chimps, wetlands alive with wading birds, and crater lakes of improbable clarity. Queen Elizabeth distills Uganda's wilderness variety into one location: a place where conservation success is visible in thriving wildlife populations and where adventure can take multiple forms across a single reserve."
  },
  "murchison-falls": {
    features: [
      "Murchison Falls: The Nile's most dramatic moment where 300 cubic meters of water per second is forced through a seven-meter gap, creating nature's most powerful waterfall",
      "Nile River game drives: Scenic riverbanks provide classic large mammal viewing with elephants, buffalo, hippos, and giraffes in riverside vegetation",
      "Boat cruises and hiking: Combination of activities including upstream cruises to the falls' base and waterfall hikes offering multiple perspectives of this natural marvel",
      "Delta ecosystem: The Nile's delta forming Lake Albert creates diverse wetlands, papyrus channels, and birdwatching opportunities unmatched in East Africa"
    ],
    story: "Murchison Falls represents the Nile's most electrifying moment—a place where one of Earth's mightiest rivers is compressed and violently compressed through a rocky chasm, emerging as a roaring white torrent that defies comprehension until you're standing beneath it, dwarfed by nature's raw power. Watching the falls from the clifftop provides one perspective; approaching by boat from below offers another—climbing along slippery rocks to stand at the falls' base, feeling the mist on your face, hearing the earthquake roar, makes visceral what maps and photographs cannot convey. The river valley itself is a wildlife corridor where, at any point along its banks, you might encounter elephants drinking upstream, hippos submerged in deep pools, or Nile crocodiles basking on rocks—each game drive or boat excursion revealing the delicate choreography of species dependent upon this legendary watercourse. Murchison Falls transforms Uganda's wilderness into something more dramatic and monumental—a place where geological forces and biological richness converge to create pure, unadulterated African adventure."
  },
  "volcanoes-rwanda": {
    features: [
      "Mountain gorillas in volcanic clouds: Trek into misty volcanic highlands to encounter endangered mountain gorillas in their native habitat with 99% encounter success rate",
      "Virunga Mountains landscape: Five dormant volcanoes create dramatic peaked horizons, lush fertile slopes, and a landscape that feels simultaneously peaceful and primal",
      "Golden monkey treks: Playful, acrobatic smaller primates unique to Virunga Mountains offer thrilling encounters and excellent photography opportunities",
      "Eco-tourism excellence: Well-developed infrastructure, exceptional guides, and luxury eco-lodges make accessible encounters with endangered species while supporting conservation"
    ],
    story: "Volcanoes National Park is where mist and mountain meet magic—a place where the fertile slopes of ancient volcanic peaks rise through perpetual clouds, and where some of Earth's most endangered and remarkable creatures have found sanctuary in the highlands' cool embrace. The hike through dense montane forest carries an anticipatory tension that builds with each challenging step: crossing moss-covered logs, pushing through tangled vegetation, ascending toward higher altitude until suddenly, impossibly, you're face-to-face with a mountain gorilla family—massive silverbacks, protective mothers, and curious youngsters observing this interspecies encounter with their own evident intelligence. The volcanoes themselves create drama visible from Rwanda's eco-lodges: mist-shrouded peaks where the landscape seems to exist partially in the physical world and partially in dreams, where golden monkeys leap through canopy branches, and where conservation success has written a narrative of redemption across a nation's recent history. Volcanoes National Park is pilgrim-age tourism at its finest—an experience that moves you emotionally while directly supporting the preservation of species that might otherwise vanish from Earth."
  },
  "akagera": {
    features: [
      "Rwanda's Big Five: One of Africa's few parks with lion, leopard, elephant, buffalo, and rhinoceros—a conservation success with rhino reintroduction being groundbreaking",
      "Diverse wetlands ecosystem: Lakes, marshes, and river systems create habitats for 525+ bird species and exceptional biodiversity across varied terrain",
      "Savannah landscape: More open terrain than other Rwandan parks, offering classic safari experiences with herding animals and predator-prey interactions",
      "Economic model innovation: Community-based conservation partnerships and lodge development created Rwanda's model for sustainable wildlife tourism"
    ],
    story: "Akagera National Park represents African conservation as environmental redemption—a place where Rwanda transformed a degraded landscape into a thriving sanctuary for all the continent's iconic species, including rhinos whose reintroduction after total extinction in Rwanda demonstrates possibility and hope. The park's varied terrain shifts between open savannah where zebras and buffalo move in golden grasslands, to papyrus-lined wetlands where bird calls create natural symphonies, to riverine forests where elephants emerge from vegetation like gentle giants returning from prehistory. Unlike many East African parks, Akagera maintains an intimacy—fewer tourists, more personal encounters, and the palpable sense that you're witnessing conservation success achieved through dedicated effort and international partnership rather than mere preservation of primordial wilderness. Visiting Akagera becomes an affirmation that degraded ecosystems can heal, that species on the brink can recover, and that African wildlife can thrive when communities embrace conservation as both moral imperative and economic opportunity."
  },
  "lake-kivu": {
    features: [
      "Biodiversity hotspot: Over 1,000 native fish species, many found nowhere else, supporting traditional fishing communities and unique lake ecology",
      "Picturesque volcanic setting: Lake surrounded by terraced volcanic slopes, lush green hills, and Rwanda's stunning Rift Valley topography",
      "Adventure activities: Kayaking, mountain biking, hiking, and water sports all accessible from lakeside towns like Kibuye and Gisenyi",
      "Cultural gateway: Authentic experiences with local communities, hot springs, traditional markets, and immersion in Rwandan culture beyond safari contexts"
    ],
    story: "Lake Kivu is where Africa's adventure transforms into something slower-paced and more introspective—a massive freshwater lake nestled between volcanic peaks, its waters reflecting sky and mountains in a mirror so perfect it seems almost artificial. The lake's remarkably emerald-hued water masks extraordinary biodiversity: thousands of endemic fish species evolved in this isolated ecosystem, traditional fishermen still use wooden boats and nets passed down through generations, and the atmosphere carries a spiritual quality enhanced by the volcanic geology visible in every direction. Kayaking across these waters at dawn, mountains emerging from mist, or cycling through villages where children shout greetings in French and Kinyarwanda, you experience Rwanda's integration of tourism, conservation, and lived culture in ways the national parks cannot convey. Lake Kivu represents a different African narrative—not the drama of predators and herds, but the quieter wonder of communities adapted to and dependent upon their environment, of geological beauty, and of adventure that unfolds at human pace rather than safari pace."
  },
  "simien-mountains": {
    features: [
      "Endemic gelada baboons: World's largest baboon species (up to 15,000 in Simien) found exclusively here—unique primates displaying crimson chest patches and complex social structures",
      "Dramatic escarpments: Sheer cliff walls dropping 1,500+ meters create some of Africa's most spectacular mountain scenery and photographic opportunities",
      "Walia ibex sanctuary: Once thought extinct, conservation efforts restored populations of these endemic wild goats to their only natural habitat",
      "Multi-day trekking infrastructure: Established trails, porter services, and mountain guides enable multi-day expeditions through varied alpine zones"
    ],
    story: "The Simien Mountains are primordial wilderness preserved in stone—a landscape so dramatically sculpted that they seem less like mountains and more like Earth's raw geological heart exposed to sky, with escarpments dropping thousands of meters and peaks so towering they seem to pierce clouds permanently parked overhead. Here, vast herds of endemic gelada baboons—creatures unique to this mountain—congregate on grassy plateaus with a dignity that transcends typical primate behavior, displaying their distinctive crimson chests and communicating through vocalizations that echo across valley walls. Trekking through Simien engages you in a landscape other-worldly and remote—traversing high-altitude desert, traversing plateaus bordered by incomprehensible drops, encountering Walia ibex on impossible cliff faces where they somehow maintain existence. Ethiopia's mountainous geography and ancient cultural complexity merge with raw wilderness in Simien—a destination that challenges your expectations of African safari and reveals a continent of extraordinary and subtle variety."
  },
  "lalibela": {
    features: [
      "Rock-hewn churches: Eleven monolithic churches carved from living volcanic rock between 12th-13th centuries represent architectural and spiritual engineering marvels",
      "African Petra: UNESCO World Heritage Site comparable to Petra in Jordan—underground churches accessed by descending below ground level into subterranean sanctuaries",
      "Living pilgrimage site: Still-active churches with Ethiopian Orthodox christian worshippers creating authentic spiritual atmosphere throughout the year",
      "Spiritual significance: Sacred site second only to Jerusalem in Ethiopian Christian theology, with 58+ connected churches and underground networks"
    ],
    story: "Lalibela is where stone became scripture—where medieval Ethiopian builders created churches by removing rock rather than stacking it, descending earthward to access sanctuaries carved from living volcanic stone twelve centuries ago and still active with pilgrims and priests today. Walking into these subterranean churches is entering a faith carved into geology: intricate crosses adorning walls, chambers hewn from single stones, and an acoustic quality that seems designed to amplify prayer and song into the mountain itself, connecting earthly worship with divine presence. The site moves beyond tourism into genuine pilgrimage—witness Ethiopian Orthodox Christians celebrating ancient liturgies in churches where their ancestors worshipped for eight hundred years, where the smell of incense mingles with stone-scent, and where time seems negotiable between centuries. Lalibela represents Africa's Christian heritage rarely encountered by Western travelers—a place where faith and architecture synthesized into enduring monuments that inspire awe across millennium and across spiritual traditions."
  },
  "kruger": {
    features: [
      "Unmatched biodiversity: 145 mammal species, 518 bird species, and extraordinary reptile diversity across 19,633 square kilometers of protected land",
      "Big Five abundance: Dense populations of all five iconic species with excellent research infrastructure and multiple viewing opportunities daily",
      "World-class accommodation range: From budget rest camps to five-star luxury lodges, accommodating all budget levels while maintaining excellent service standards",
      "Research destination: Home to long-term ecological research programs, contributing global knowledge about predator-prey dynamics and ecosystem management"
    ],
    story: "Kruger National Park is African safari refined to its most accessible essence—a sprawling empire of wilderness where every element of the Big Five exists in abundance and where centuries of conservation investments created infrastructure that allows diverse travelers to experience wild Africa comfortably. The park's sheer size creates illusion of infinite landscape: driving through it, you witness ecological transitions from riverine forests to open grasslands, encounter wildlife so regularly that sighting transitions from remarkable to routine, and gradually understand how ecosystems function as integrated wholes rather than collections of individual species. South Africa's flagship park masters the balance between preservation and access, conservation and tourism, wilderness and civilization—a feat requiring sophisticated management visible in every aspect of the experience. Kruger represents modern African safari at its most established: a destination where wildlife encounters are likely rather than hoped-for, where professional guides share deep ecological knowledge, and where the sheer proven success of the reserve creates confidence that Africa's wilderness has a sustainable future."
  },
  "cape-town": {
    features: [
      "Table Mountain: Iconic 1,086-meter peak offering breathtaking panoramic views of the city, surrounding mountains, and the convergence of Atlantic and Indian Oceans",
      "Cape Point: Dramatic headland where two ocean currents meet (contrary to the still-popular myth about two oceans meeting), creating a powerful natural phenomenon",
      "Cosmopolitan cultural blend: African, European, and Asian influences merge in world-class restaurants, museums, galleries, and neighborhoods like the vibrant Bo-Kaap",
      "Nearby wildlife: Close proximity to penguin colonies, great white shark habitat, and whale watching opportunities make Cape Town a hybrid urban-wildlife destination"
    ],
    story: "Cape Town is where African adventure meets Mediterranean sophistication—a place where Table Mountain's iconic profile guards a city that balances cosmopolitan ambition with wildness barely contained beyond its urban boundaries, where World Cup stadiums and modern infrastructure coexist with Table Mountain views that remain essentially unchanged since European explorers first rounded the Cape. The city itself pulses with cultural energy: walking through the Bo-Kaap's colorful streets, visiting museums dedicating to Nelson Mandela and political history, dining on contemporary African cuisine while watching the sunset paint the Atlantic gold, you experience African culture in its contemporary form rather than solely its historical or wildlife contexts. Beyond the city, Cape Point's dramatic headlands, penguin colonies waddling on pristine beaches, and whale migrations create the paradoxical experience of wildlife encounters within view of a major metropolitan skyline. Cape Town represents Africa's urban frontier—still fundamentally African, yet sophisticated and globally integrated, offering travelers not safari alone but the fuller spectrum of contemporary African urban life and natural beauty synthesized."
  },
  "mara-safari-club": {
    features: [
      "Luxury wilderness accommodation: Premium suites combining five-star comfort with authentic safari immersion, bridging the gap between civilization and wilderness",
      "Optimal Masai Mara location: Positioned at key wildlife corridors during migration season, maximizing encounter probability and dramatic wildlife viewing",
      "Gourmet dining experiences: Chef-prepared cuisine featuring both international standards and local ingredients, served under African skies or in elegant dining venues",
      "Personalized safari guides: Expert naturalists providing customized game drives focused on guests' specific wildlife interests and photography needs"
    ],
    story: "Mara Safari Club represents the apotheosis of African safari luxury—where the raw thrill of the Masai Mara's Great Migration is filtered through five-star comfort, where you return from morning game drives to infinity pools overlooking endless grasslands, and where champagne toasts beneath acacia trees celebrate daily wildlife encounters that would satisfy most travelers' entire safari dreams. This is safari for those accustomed to luxury, where design and comfort enhance rather than distract from the wilderness experience, where expert guides combine deep ecological knowledge with sensitivity to guest preferences, and where the landscape itself remains the ultimate amenity. The lodge captures Masai Mara magic while providing respite from the physical and emotional intensity of true wilderness—every sunset is a performance, every meal becomes meditation on taste and place, and every moment acknowledges that African adventure can coexist with sophisticated service. Mara Safari Club curates an experience for travelers seeking intense wildlife encounters wrapped in the familiar language of luxury hospitality."
  },
  "zanzibar-beach-resort": {
    features: [
      "Serengeti views with creature comforts: Strategically positioned to offer game drive access combined with resort amenities unusual for typical bush lodges",
      "Community integration: Evening cultural programs and local artisan interactions connect guests with Tanzanian traditions and contemporary culture",
      "Outdoor lounge theater: Campfire settings and elevated viewing platforms create spaces for social connection while observing wildlife and landscapes",
      "Sustainable design: Rustic-chic aesthetics incorporating local materials and design traditions while minimizing environmental impact"
    ],
    story: "Serengeti Oasis Lodge bridges two seemingly incompatible African dreams—offering the raw thrill of a Serengeti landscape where predator and prey negotiate daily survival alongside the comfort and social connection of traditional lodge hospitality, where conversations around campfires reveal the journeys that brought fellow travelers here and create bonds as memorable as the wildlife itself. The lodge's design philosophy honors Serengeti aesthetics while providing shelter from its extremes: rustic-chic accommodations that feel more authentic than generic resort polish, gathering spaces where group meals and shared experiences create community, and positioning that allows you to drift between active wildlife observation and contemplative rest throughout the day. Evening programs connecting guests with local Tanzanian culture and artisan communities transform the lodge from mere accommodation into cultural exchange point, where wilderness adventure is contextualized within human communities who call these landscapes home. Serengeti Oasis Lodge recognizes that travel's most lasting memories emerge from the synthesis of wilderness wonder, human connection, and authentic cultural engagement—all three woven together into African safari that sustains both body and spirit."
  }
};
import { ArrowRight, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ImageSlider = ({ images, name }: { images: string[], name: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${name} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ))}
    </>
  );
};

const Destinations = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState(null);

  // Show all destinations in a single grid, no grouping

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <section className="relative pt-32 pb-20 bg-primary text-primary-foreground">
            <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Explore Africa</span>
              <h1 className="text-4xl sm:text-5xl font-bold mt-3">Our Destinations</h1>
              <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto text-lg">
                From Kenya's savannahs to Ethiopia's ancient highlands — discover East Africa and beyond through unforgettable safari, cultural, and coastal experiences.
              </p>
            </div>
          </section>

          <section className="section-padding bg-background" ref={ref}>
            <div className="container-wide mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((dest, index) => (
                  <div
                    key={dest.id}
                    className={`group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                    onClick={() => setSelected(dest)}
                  >
                    <ImageSlider images={dest.images || [dest.image]} name={dest.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                      <p className="text-white/70 text-sm mt-2 line-clamp-2">{dest.description}</p>
                      <div className="flex items-center gap-2 mt-3 text-accent text-sm font-semibold">
                        {dest.safariCount} Hotels & Lounges
                      </div>
                    </div>
                  </div>
                ))}
                    {/* Destination Modal */}
                    {selected && (
                      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col">
                        <button
                          className="absolute top-6 right-8 text-4xl text-white hover:text-accent z-50"
                          onClick={() => setSelected(null)}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                        <div className="flex-1 flex flex-col md:flex-row w-full h-full overflow-auto">
                          <div className="md:w-1/2 w-full h-64 md:h-auto relative">
                            <img
                              src={selected.images?.[0] || selected.image}
                              alt={selected.name}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="flex-1 bg-white bg-opacity-95 p-8 flex flex-col overflow-y-auto">
                            <h2 className="text-3xl font-bold text-primary mb-2">{selected.name}</h2>
                            <div className="text-accent font-semibold text-lg mb-2">{selected.country}</div>
                            {destinationEnhancements[selected.id] && (
                              <>
                                <ul className="list-disc pl-5 mb-4 text-foreground/90">
                                  {destinationEnhancements[selected.id].features.map((f, i) => (
                                    <li key={i}>{f}</li>
                                  ))}
                                </ul>
                                <div className="text-base text-muted-foreground mb-4">
                                  <strong>Story:</strong> <br />
                                  {destinationEnhancements[selected.id].story}
                                </div>
                              </>
                            )}
                            <div className="flex gap-4 mt-4">
                              <a
                                href={`/booking?destination=${encodeURIComponent(selected.name)}`}
                                className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-accent/90 transition"
                              >
                                Book Now
                              </a>
                              <button
                                className="inline-block border border-accent text-accent font-semibold px-6 py-3 rounded-lg hover:bg-accent/10 transition"
                                onClick={() => setSelected(null)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Destinations;
