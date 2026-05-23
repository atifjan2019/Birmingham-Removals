import { BUSINESS } from "@/config/business";
import { batch1 } from "@/lib/areaContent/batch1";
import { batch2 } from "@/lib/areaContent/batch2";
import { batch3 } from "@/lib/areaContent/batch3";
import { batch4 } from "@/lib/areaContent/batch4";
import { batch5 } from "@/lib/areaContent/batch5";
import { batch6 } from "@/lib/areaContent/batch6";

// Hand-written per-area unique content. Each batch file exports an object
// keyed by slug with shape: { metaDescription, openingHook, localUnique,
// uniqueFaqs: [{q,a},{q,a}] }. We merge all batches into a single map.
const uniqueContent = {
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
  ...batch6,
};

const rawAreaPages = [
  { name: `Bromsgrove`, slug: "bromsgrove", postcodes: `B60, B61`, postcode: `B60`, borough: `Bromsgrove District`, region: `Worcestershire`, group: `Solihull & South Birmingham`, refs: ["High Street","Stourbridge Road","Birmingham Road"], housing: `Victorian terraces, inter-war semis and newer executive homes`, access: `A38, M5 J4/J5 and the Birmingham Road corridor`, market: `commuters leaving south Birmingham for more space`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Redditch`, slug: "redditch", postcodes: `B97, B98`, postcode: `B97`, borough: `Redditch Borough`, region: `Worcestershire`, group: `Solihull & South Birmingham`, refs: ["Church Green","Evesham Road","Bromsgrove Road"], housing: `post-1960s new-town estates, maisonettes and family semis`, access: `A441, A448 and the M42 link via Alvechurch`, market: `first-time buyers, renters and households moving between Redditch and Birmingham`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Tamworth`, slug: "tamworth", postcodes: `B77, B78, B79`, postcode: `B77`, borough: `Tamworth Borough`, region: `Staffordshire`, group: `Staffordshire`, refs: ["Tamworth town centre","Dosthill","Wilnecote","Amington"], housing: `older terraces, modern estates and detached commuter homes`, access: `A5, A51, M42 and M6 Toll approaches`, market: `families using the north-east Birmingham commuter belt`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Lichfield`, slug: "lichfield", postcodes: `WS13, WS14`, postcode: `WS13`, borough: `Lichfield District`, region: `Staffordshire`, group: `Staffordshire`, refs: ["Cathedral Close","Beacon Street","Tamworth Road"], housing: `Georgian townhouses, Victorian terraces and new-build estates`, access: `A38, A51 and city-centre conservation streets`, market: `Birmingham professionals relocating for a cathedral-city pace`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Sutton Four Oaks`, slug: "sutton-four-oaks", postcodes: `B74`, postcode: `B74`, borough: `Birmingham / Sutton Coldfield`, region: `West Midlands`, group: `Birmingham`, refs: ["Lichfield Road","Mere Green Road","Little Aston Road"], housing: `large detached homes, private roads and premium family houses`, access: `A5127, Four Oaks station and private-drive access points`, market: `high-value upsizing and downsizing around northern Sutton Coldfield`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Sutton Mere Green`, slug: "sutton-mere-green", postcodes: `B75`, postcode: `B75`, borough: `Birmingham / Sutton Coldfield`, region: `West Midlands`, group: `Birmingham`, refs: ["Mere Green Road","Lichfield Road","Belwell Lane"], housing: `Victorian shopfronts, 1930s semis and family detached homes`, access: `A5127, Belwell Lane and Four Oaks rail access`, market: `families wanting central Sutton amenities without city-centre pressure`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Sutton Walmley and Minworth`, slug: "sutton-walmley", postcodes: `B76`, postcode: `B76`, borough: `Birmingham / Sutton Coldfield`, region: `West Midlands`, group: `Birmingham`, refs: ["Walmley Road","Eachelhurst Road","Minworth industrial fringe"], housing: `1990s-2010s estates, townhouses and suburban semis`, access: `A38, A452 and M6 Toll routes near Minworth`, market: `families moving between newer estates and larger Sutton homes`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Sutton Trinity`, slug: "sutton-trinity", postcodes: `B72`, postcode: `B72`, borough: `Birmingham / Sutton Coldfield`, region: `West Midlands`, group: `Birmingham`, refs: ["Boldmere Road","Duke Street","Rectory Road"], housing: `Victorian terraces, Edwardian semis and central Sutton apartments`, access: `Sutton town centre, A5127 and station-side roads`, market: `central Sutton moves for professionals, families and downsizers`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Sutton Vesey`, slug: "sutton-vesey", postcodes: `B73`, postcode: `B73`, borough: `Birmingham / Sutton Coldfield`, region: `West Midlands`, group: `Birmingham`, refs: ["Jockey Road","Penns Lane","Chester Road"], housing: `1930s-50s semis, bungalows and larger detached homes`, access: `A452 Chester Road, Penns Lane and Erdington approaches`, market: `steady family moves between Erdington, Boldmere and Sutton`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Sutton Roughley`, slug: "sutton-roughley", postcodes: `B75`, postcode: `B75`, borough: `Birmingham / Sutton Coldfield`, region: `West Midlands`, group: `Birmingham`, refs: ["Roughley Drive","Hill Village Road","Tamworth Road"], housing: `1960s-80s detached and semi-detached estates`, access: `A453 Tamworth Road and lanes towards Little Hay`, market: `quiet residential upsizing on the northern edge of Sutton`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Knowle`, slug: "knowle", postcodes: `B93`, postcode: `B93`, borough: `Solihull Borough`, region: `West Midlands`, group: `Solihull & South Birmingham`, refs: ["High Street","St John's Close","Kenilworth Road"], housing: `period cottages, Victorian villas and modern executive homes`, access: `conservation-area streets, A4141 and M42 J5`, market: `premium upsizing and downsizing among Birmingham professionals`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Dorridge`, slug: "dorridge", postcodes: `B93`, postcode: `B93`, borough: `Solihull Borough`, region: `West Midlands`, group: `Solihull & South Birmingham`, refs: ["Grove Road","Dorridge Road","Fen End Road"], housing: `detached houses and large semi-detached commuter homes`, access: `Dorridge station, A3400 and lanes towards Bentley Heath`, market: `London-line commuters and families buying larger B93 homes`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Balsall Common`, slug: "balsall-common", postcodes: `CV7`, postcode: `CV7`, borough: `Solihull Borough`, region: `West Midlands`, group: `Solihull & South Birmingham`, refs: ["Kenilworth Road","Balsall Street","Holly Lane"], housing: `1970s estates, bungalows and larger detached properties`, access: `A452, rural lanes and HS2 Interchange growth routes`, market: `families choosing village space between Solihull and Coventry`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Castle Bromwich`, slug: "castle-bromwich", postcodes: `B36`, postcode: `B36`, borough: `Solihull / Birmingham fringe`, region: `West Midlands`, group: `Solihull & South Birmingham`, refs: ["Chester Road","Bradford Road","Castle Bromwich Hall Gardens"], housing: `post-war semis, 1980s-90s estates and period properties`, access: `A452 Chester Road, M6 J5 and the M42 link`, market: `suburban family moves between Solihull, Castle Vale and east Birmingham`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Streetly`, slug: "streetly", postcodes: `B74`, postcode: `B74`, borough: `Walsall Borough`, region: `West Midlands`, group: `Walsall & Aldridge`, refs: ["Foley Road East","Chester Road","Queslett Road"], housing: `larger detached homes, 1960s semis and premium Sutton-border houses`, access: `A452 Chester Road, Queslett Road and Sutton Park edges`, market: `Sutton Coldfield adjacency moves with strong owner-occupier demand`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Aldridge`, slug: "aldridge", postcodes: `WS9`, postcode: `WS9`, borough: `Walsall Borough`, region: `West Midlands`, group: `Walsall & Aldridge`, refs: ["Anchor Road","Little Aston Road","Walsall Road"], housing: `1960s-80s detached and semi-detached homes`, access: `A454, A452 and roads towards Little Aston`, market: `families moving for schools, gardens and commuter access`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Stourbridge`, slug: "stourbridge", postcodes: `DY8`, postcode: `DY8`, borough: `Dudley Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Stourbridge town centre","Hagley Road","Norton","Wollaston Road"], housing: `Victorian terraces, 1930s semis and larger suburban houses`, access: `A458, A491 and M5 J4 via Hagley`, market: `families upsizing from Brierley Hill and Dudley town`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Halesowen`, slug: "halesowen", postcodes: `B63, B62`, postcode: `B63`, borough: `Dudley Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Halesowen town centre","Quincy Estate","Hasbury","Coombs Wood"], housing: `1960s-80s estates, semis and newer executive homes`, access: `A456 Manor Way, A4099 and M5 J3`, market: `commuter moves between Birmingham, Dudley and Worcestershire`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Kingswinford`, slug: "kingswinford", postcodes: `DY6`, postcode: `DY6`, borough: `Dudley Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Wall Heath","Wordsley","Summerhill","High Street"], housing: `owner-occupied semis, detached homes and suburban estates`, access: `A491, A449 and routes towards Stourbridge`, market: `families moving from Brierley Hill, Dudley and Wall Heath`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Wollaston`, slug: "wollaston", postcodes: `DY8`, postcode: `DY8`, borough: `Dudley Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Bridgnorth Road","Rectory Road","Wollaston Hall area"], housing: `larger detached and semi-detached properties with high values`, access: `A458, Bridgnorth Road and Stourbridge access`, market: `premium Stourbridge-suburb moves and family downsizing`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Sedgley`, slug: "sedgley", postcodes: `DY3`, postcode: `DY3`, borough: `Dudley Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Bull Ring","Beacon Lane","Gospel End Road"], housing: `semis, detached homes and hilltop family properties`, access: `A463, A459 and elevated residential roads`, market: `families wanting Dudley access with more space and views`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Brierley Hill`, slug: "brierley-hill", postcodes: `DY5`, postcode: `DY5`, borough: `Dudley Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Merry Hill shopping centre","Fens Pool","Cottage Street","Mill Street"], housing: `high-rise flats, Victorian terraces and regenerated town homes`, access: `A4036, Waterfront access and Merry Hill traffic pinch points`, market: `rental moves, first-time buyers and regeneration-led relocations`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Quarry Bank`, slug: "quarry-bank", postcodes: `DY5`, postcode: `DY5`, borough: `Dudley Borough`, region: `West Midlands`, group: `Black Country`, refs: ["High Street","Stevens Park","Maughan Street"], housing: `industrial-era terraces and compact residential streets`, access: `routes into Brierley Hill, Cradley and the A4036`, market: `short local moves across former industrial villages`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Gornal`, slug: "gornal", postcodes: `DY3`, postcode: `DY3`, borough: `Dudley Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Straits Road","Clarence Street","Kent Street"], housing: `mining-era terraces, semis and hillside streets`, access: `routes towards Dudley, Kingswinford and the A459`, market: `local family moves between Upper Gornal, Lower Gornal and Dudley`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Hateley Heath`, slug: "hateley-heath", postcodes: `B71`, postcode: `B71`, borough: `Sandwell Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Woden Road","Beeches Road","Moor Street"], housing: `post-war semis and 1960s-70s estate housing`, access: `A4031, West Bromwich approaches and estate parking courts`, market: `West Bromwich estate moves and rental handovers`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Charlemont with Grove Vale`, slug: "charlemont", postcodes: `B71`, postcode: `B71`, borough: `Sandwell Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Charlemont Road","Grove Vale Avenue","Friar Park Road"], housing: `1930s-50s semis and owner-occupied family houses`, access: `A4031, Newton Road and West Bromwich links`, market: `steady family moves in a well-connected Sandwell neighbourhood`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Great Barr with Yew Tree`, slug: "great-barr", postcodes: `B43`, postcode: `B43`, borough: `Sandwell / Birmingham`, region: `West Midlands`, group: `Black Country`, refs: ["Queslett Road","Thornhill Road","Newton Road"], housing: `inter-war semis, post-war houses and well-kept estate roads`, access: `A34, Queslett Road and routes towards Perry Barr and Walsall`, market: `cross-border family moves between Sandwell, Walsall and north Birmingham`, isDistantArea: false, expandedExisting: true, priority: 0.8 },
  { name: `Princes End`, slug: "princes-end", postcodes: `DY4`, postcode: `DY4`, borough: `Sandwell Borough`, region: `West Midlands`, group: `Black Country`, refs: ["Lower Church Lane","Alexandra Road","Bloomfield Road"], housing: `older terraces, semis and compact Tipton streets`, access: `A4037, Tipton Road and Black Country New Road links`, market: `local moves between Tipton, Wednesbury and Dudley`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Pelsall`, slug: "pelsall", postcodes: `WS3`, postcode: `WS3`, borough: `Walsall Borough`, region: `West Midlands`, group: `Walsall & Aldridge`, refs: ["High Street","Norton Road","Pelsall Common"], housing: `1930s semis, bungalows and post-war estates`, access: `A4124, Walsall Road and village-centre parking`, market: `quiet village moves north of Walsall`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Brownhills`, slug: "brownhills", postcodes: `WS8`, postcode: `WS8`, borough: `Walsall Borough`, region: `West Midlands`, group: `Walsall & Aldridge`, refs: ["High Street","Chester Road","Watling Street"], housing: `older terraces, former mining cottages and newer estates`, access: `A5 Watling Street, A452 and canal-side roads`, market: `first-time buyer and rental moves on the Walsall/Lichfield edge`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Pheasey`, slug: "pheasey", postcodes: `B43`, postcode: `B43`, borough: `Walsall Borough`, region: `West Midlands`, group: `Walsall & Aldridge`, refs: ["Queslett Road","Wimperis Way","Dyas Road"], housing: `1950s-60s semis, bungalows and post-war estate homes`, access: `Queslett Road, A34 and Great Barr approaches`, market: `downsizers and families moving near the Birmingham border`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Rushall`, slug: "rushall", postcodes: `WS4`, postcode: `WS4`, borough: `Walsall Borough`, region: `West Midlands`, group: `Walsall & Aldridge`, refs: ["Daw End Lane","Bosty Lane","Rushall Canal walk"], housing: `inter-war semis, post-war homes and canal-side streets`, access: `A461, Lichfield Road and Aldridge routes`, market: `family moves between Walsall, Shelfield and Aldridge`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Shelfield`, slug: "shelfield", postcodes: `WS4`, postcode: `WS4`, borough: `Walsall Borough`, region: `West Midlands`, group: `Walsall & Aldridge`, refs: ["Lichfield Road","Vicarage Road","Shelfield village"], housing: `bungalows, semis and quiet residential closes`, access: `Lichfield Road, Bosty Lane and Walsall approaches`, market: `retiree downsizing and smaller local moves north of Walsall`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Tettenhall Regis`, slug: "tettenhall-regis", postcodes: `WV6`, postcode: `WV6`, borough: `Wolverhampton`, region: `West Midlands`, group: `Wolverhampton`, refs: ["Tettenhall Road","Wood Road","Upper Green"], housing: `large Victorian and Edwardian detached properties`, access: `conservation-area lanes, A41 and western Wolverhampton routes`, market: `premium moves around one of Wolverhampton's most sought-after suburbs`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Tettenhall Wightwick`, slug: "tettenhall-wightwick", postcodes: `WV6`, postcode: `WV6`, borough: `Wolverhampton`, region: `West Midlands`, group: `Wolverhampton`, refs: ["Wightwick Manor","Wightwick Bank","Bridgnorth Road","Perton Road"], housing: `executive detached homes and period properties`, access: `A454 Bridgnorth Road, Wightwick Bank and private drives`, market: `top-end Wolverhampton relocations with specialist item handling`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Penn`, slug: "penn", postcodes: `WV4`, postcode: `WV4`, borough: `Wolverhampton`, region: `West Midlands`, group: `Wolverhampton`, refs: ["Penn Road","Lloyd Hill","Coalway Road"], housing: `1930s-60s semis and detached family homes`, access: `A449 Penn Road and routes towards Stourbridge`, market: `families moving for schools and larger south-west Wolverhampton homes`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Oxley`, slug: "oxley", postcodes: `WV10`, postcode: `WV10`, borough: `Wolverhampton`, region: `West Midlands`, group: `Wolverhampton`, refs: ["Stafford Road","Bushbury Lane","Oxley Avenue"], housing: `inter-war semis and post-war estates`, access: `A449 Stafford Road and northern ring-road access`, market: `local moves on the northern edge of Wolverhampton`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Bushbury North`, slug: "bushbury-north", postcodes: `WV10`, postcode: `WV10`, borough: `Wolverhampton`, region: `West Midlands`, group: `Wolverhampton`, refs: ["Bushbury Lane","Long Knowle Lane","Showell Road"], housing: `post-war council-built and privately purchased semis`, access: `Stafford Road, M54 approaches and estate cul-de-sacs`, market: `family and rental moves near Wolverhampton city fringe`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Merry Hill`, slug: "merry-hill", postcodes: `WV4`, postcode: `WV4`, borough: `Wolverhampton`, region: `West Midlands`, group: `Wolverhampton`, refs: ["Coalway Road","Merry Hill Road","Birches Barn Road"], housing: `residential semis and detached homes around Penn`, access: `Coalway Road and routes into Wolverhampton or Stourbridge`, market: `Penn-area family moves, distinct from the Brierley Hill shopping centre`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Earlsdon`, slug: "earlsdon", postcodes: `CV5`, postcode: `CV5`, borough: `Coventry`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Albany Road","Earlsdon Street","Spencer Avenue"], housing: `Victorian and Edwardian terraces, conversions and family semis`, access: `city permit streets, A45 access and routes to Warwick University`, market: `young professionals, academics and students moving in west Coventry`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Cheylesmore`, slug: "cheylesmore", postcodes: `CV3`, postcode: `CV3`, borough: `Coventry`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Quinton Road","Charter Avenue","Poitiers Road"], housing: `1950s-60s semis, detached homes and post-war estates`, access: `A45/A46 approaches and streets south of the city centre`, market: `family moves from central Coventry into quieter residential roads`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Wainbody`, slug: "wainbody", postcodes: `CV3`, postcode: `CV3`, borough: `Coventry`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Green Lane","Wainbody Avenue","Coat of Arms Bridge Road"], housing: `1930s-50s semis and detached homes`, access: `A45, Kenilworth Road and leafy residential avenues`, market: `families moving for schools and larger gardens`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Woodlands`, slug: "woodlands", postcodes: `CV5`, postcode: `CV5`, borough: `Coventry`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Tile Hill Lane","Jardine Crescent","Torrington Avenue"], housing: `post-war estates and 1970s-80s family homes`, access: `A45, Tile Hill routes and west Coventry estate roads`, market: `local moves between Tile Hill, Canley and Allesley edges`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Bablake`, slug: "bablake", postcodes: `CV1, CV6`, postcode: `CV1`, borough: `Coventry`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Bablake School","Coundon Road","Barkers Butts Lane","Hollyfast Road"], housing: `Victorian terraces and inter-war semis`, access: `city fringe routes, Coundon Road and ring-road approaches`, market: `school-area moves and city-fringe relocations`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Whoberley`, slug: "whoberley", postcodes: `CV5`, postcode: `CV5`, borough: `Coventry`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Whoberley Avenue","Beechwood Avenue","Keresley Road"], housing: `inter-war and post-war semis`, access: `A45, Allesley Old Road and west Coventry approaches`, market: `quiet residential moves west of Coventry city centre`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Northfield`, slug: "northfield", postcodes: `B31`, postcode: `B31`, borough: `Birmingham`, region: `West Midlands`, group: `Birmingham`, refs: ["Church Road","Bristol Road South","Bunbury Road"], housing: `1930s semis, post-war estates and Victorian terraces`, access: `A38 Bristol Road South and Northfield station routes`, market: `large south Birmingham suburb moves with strong transport links`, isDistantArea: false, expandedExisting: true, priority: 0.8 },
  { name: `Longbridge and West Heath`, slug: "longbridge", postcodes: `B31, B38`, postcode: `B31`, borough: `Birmingham`, region: `West Midlands`, group: `Birmingham`, refs: ["Austin Way","Longbridge Lane","West Heath Road"], housing: `older terraces and new-build estates on former industrial land`, access: `A38, Longbridge station and M5/M42 routes`, market: `regeneration-led moves around the former Rover plant`, isDistantArea: false, expandedExisting: true, priority: 0.8 },
  { name: `Rubery and Rednal`, slug: "rubery", postcodes: `B45`, postcode: `B45`, borough: `Birmingham / Worcestershire fringe`, region: `West Midlands`, group: `Birmingham`, refs: ["New Road","Egghill Lane","Rednal Road"], housing: `semis, detached homes and quiet border estates`, access: `A38, M5 J4 and lanes by the Lickey Hills`, market: `families moving on the Birmingham and Worcestershire boundary`, isDistantArea: false, expandedExisting: true, priority: 0.8 },
  { name: `Frankley Great Park`, slug: "frankley-great-park", postcodes: `B32, B45`, postcode: `B32`, borough: `Birmingham`, region: `West Midlands`, group: `Birmingham`, refs: ["Frankley Beeches Road","Tessall Lane","Frankley Great Park"], housing: `post-war and 1970s estate housing`, access: `M5 J3/J4, B45 routes and estate parking courts`, market: `south-west Birmingham estate moves and local upsizing`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Castle Vale`, slug: "castle-vale", postcodes: `B35`, postcode: `B35`, borough: `Birmingham`, region: `West Midlands`, group: `Birmingham`, refs: ["Tangmere Drive","Farnborough Road","Castle Vale Retail Park"], housing: `regenerated housing, new-builds and refurbished estate homes`, access: `A452, M6 J5 and Spitfire Island routes`, market: `moves across a regenerated north-east Birmingham estate`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Bournville and Cotteridge`, slug: "bournville", postcodes: `B30`, postcode: `B30`, borough: `Birmingham`, region: `West Midlands`, group: `Birmingham`, refs: ["Bournville Lane","Mary Vale Road","Linden Road","Cotteridge centre"], housing: `Arts and Crafts cottages, period semis and conservation streets`, access: `Bournville Village Trust roads, A441 and station approaches`, market: `careful moves in Cadbury heritage streets and Cotteridge terraces`, isDistantArea: false, expandedExisting: true, priority: 0.8 },
  { name: `Highters Heath`, slug: "highters-heath", postcodes: `B14`, postcode: `B14`, borough: `Birmingham`, region: `West Midlands`, group: `Birmingham`, refs: ["Highfield Road","Highters Heath Lane","Alcester Road South"], housing: `1920s-50s semis and detached homes`, access: `A435 Alcester Road South and Shirley approaches`, market: `family moves between Kings Heath, Yardley Wood and Shirley`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Kings Norton North`, slug: "kings-norton", postcodes: `B30, B38`, postcode: `B30`, borough: `Birmingham`, region: `West Midlands`, group: `Birmingham`, refs: ["Pershore Road South","Kings Norton Green","Westhill Road"], housing: `Victorian, inter-war and post-war housing`, access: `A441, Kings Norton station and historic village streets`, market: `south Birmingham moves around the Green and West Heath edges`, isDistantArea: false, expandedExisting: true, priority: 0.8 },
  { name: `Shard End`, slug: "shard-end", postcodes: `B34`, postcode: `B34`, borough: `Birmingham`, region: `West Midlands`, group: `Birmingham`, refs: ["Shard End Crescent","Packington Avenue","Coleshill Road"], housing: `post-war and 1960s estate housing`, access: `A47, Collector Road and M6/M42 approaches`, market: `east Birmingham estate moves and local family relocations`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Bentley Heath`, slug: "bentley-heath", postcodes: `B93`, postcode: `B93`, borough: `Solihull Borough`, region: `West Midlands`, group: `Solihull & South Birmingham`, refs: ["Widney Manor Road","Tilehouse Lane","Bentley Heath village"], housing: `1960s-70s detached and semi-detached estates`, access: `Widney Manor Road, Dorridge station routes and M42 access`, market: `residential moves between Dorridge, Knowle and Solihull`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Meriden`, slug: "meriden", postcodes: `CV7`, postcode: `CV7`, borough: `Solihull Borough`, region: `West Midlands`, group: `Solihull & South Birmingham`, refs: ["Main Road","Fillongley Road","Millisons Wood"], housing: `village cottages, bungalows and new-build estates`, access: `A45, rural lanes and routes between Birmingham and Coventry`, market: `rural village moves around the claimed centre of England`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Hampton-in-Arden`, slug: "hampton-in-arden", postcodes: `B92`, postcode: `B92`, borough: `Solihull Borough`, region: `West Midlands`, group: `Solihull & South Birmingham`, refs: ["High Street","Marsh Lane","Diddington Lane"], housing: `period properties, barn conversions and premium rural homes`, access: `railway station, A45 and narrow village lanes`, market: `affluent village downsizing and specialist rural-property moves`, isDistantArea: false, expandedExisting: false, priority: 0.8 },
  { name: `Warwick`, slug: "warwick", postcodes: `CV34`, postcode: `CV34`, borough: `Warwick District`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Castle Street","Emscote Road","Myton Road"], housing: `Georgian townhouses, Victorian terraces and riverside properties`, access: `A46, M40 J15 and historic centre access`, market: `county-town moves between Birmingham, Leamington and south Warwickshire`, isDistantArea: false, expandedExisting: false, priority: 0.7 },
  { name: `Stratford-upon-Avon`, slug: "stratford-upon-avon", postcodes: `CV37`, postcode: `CV37`, borough: `Stratford-on-Avon District`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Bridge Street","Shipston Road","Alcester Road"], housing: `period properties, thatched cottages and executive new-builds`, access: `A46, narrow tourist streets and riverside loading points`, market: `high-value moves with antiques, art and specialist packing`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `Rugby`, slug: "rugby", postcodes: `CV21, CV22`, postcode: `CV21`, borough: `Rugby Borough`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Hillmorton Road","Clifton Road","Newbold Road"], housing: `Victorian terraces, inter-war semis and modern estates`, access: `M6, M45, A426 and station approaches`, market: `commuter and long-distance moves south-east of Birmingham`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `Worcester`, slug: "worcester", postcodes: `WR1, WR2`, postcode: `WR1`, borough: `Worcester City`, region: `Worcestershire`, group: `Worcestershire & Beyond`, refs: ["Foregate Street","London Road","Bromwich Road"], housing: `Georgian, Victorian and Edwardian properties plus riverside homes`, access: `M5 J6/J7, city-centre one-way streets and river crossings`, market: `cathedral-city moves from Birmingham into Worcestershire`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `Stafford`, slug: "stafford", postcodes: `ST16, ST17`, postcode: `ST16`, borough: `Stafford Borough`, region: `Staffordshire`, group: `Staffordshire`, refs: ["Greengate Street","Newport Road","Lichfield Road"], housing: `Victorian houses, inter-war semis and modern new-build estates`, access: `M6 J13/J14, A34 and town-centre access`, market: `county-town relocations around 26 miles from Birmingham`, isDistantArea: false, expandedExisting: false, priority: 0.7 },
  { name: `Nuneaton and Bedworth`, slug: "nuneaton", postcodes: `CV10, CV11, CV12`, postcode: `CV10`, borough: `Nuneaton and Bedworth Borough`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Queen's Road","Bond Gate","Newtown Road"], housing: `terraces, semi-detached homes and modern new-build estates`, access: `A444, M6, M69 and town-centre loading routes`, market: `Warwickshire moves 20-25 miles east of Birmingham`, isDistantArea: false, expandedExisting: false, priority: 0.7 },
  { name: `Cannock Chase`, slug: "cannock", postcodes: `WS11, WS12`, postcode: `WS11`, borough: `Cannock Chase District`, region: `Staffordshire`, group: `Staffordshire`, refs: ["Market Hall Street","Hednesford Road","Chase Road"], housing: `post-war semis and newer executive developments`, access: `M6 Toll, A5 and routes by Cannock Chase`, market: `growing commuter moves beside the Chase and Hednesford`, isDistantArea: false, expandedExisting: false, priority: 0.7 },
  { name: `Wyre Forest`, slug: "kidderminster", postcodes: `DY10, DY11, DY12`, postcode: `DY10`, borough: `Wyre Forest District`, region: `Worcestershire`, group: `Worcestershire & Beyond`, refs: ["Mill Street","Comberton Hill","Bewdley Hill"], housing: `Victorian terraces, town semis and executive rural homes`, access: `A456, A449 and hilly roads towards Bewdley`, market: `Kidderminster, Bewdley and Stourport moves from Birmingham`, isDistantArea: false, expandedExisting: false, priority: 0.7 },
  { name: `Telford and Wrekin`, slug: "telford", postcodes: `TF1-TF7`, postcode: `TF1-TF7`, borough: `Telford and Wrekin`, region: `Shropshire`, group: `Shropshire & Herefordshire`, refs: ["Telford town centre","Newport","Wellington","Ironbridge"], housing: `new-town housing, older village homes and Ironbridge character properties`, access: `M54, A442 and estate distributor roads`, market: `longer-distance moves north-west of Birmingham`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `Shrewsbury/Shropshire`, slug: "shrewsbury", postcodes: `SY1-SY13, TF`, postcode: `SY1-SY13`, borough: `Shropshire`, region: `Shropshire`, group: `Shropshire & Herefordshire`, refs: ["English Bridge","Wyle Cop","Castle Street in Ludlow"], housing: `rural cottages, townhouses, farmhouses and character terraces`, access: `A5, A49 and narrow rural lanes across the county`, market: `full-day long-distance moves into Shrewsbury, Oswestry and Ludlow`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `Herefordshire`, slug: "hereford", postcodes: `HR1-HR9`, postcode: `HR1-HR9`, borough: `Herefordshire`, region: `Herefordshire`, group: `Shropshire & Herefordshire`, refs: ["Hereford Cathedral","Ledbury High Street","Ross Market Place"], housing: `rural farms, period cottages and market-town houses`, access: `A49, A438 and long rural access lanes`, market: `specialist long-distance moves to Hereford, Ledbury and Ross-on-Wye`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `Malvern Hills`, slug: "malvern", postcodes: `WR13, WR14`, postcode: `WR13`, borough: `Malvern Hills District`, region: `Worcestershire`, group: `Worcestershire & Beyond`, refs: ["Church Street","Malvern Link","West Malvern Road"], housing: `period villas, hill cottages and high-value rural homes`, access: `steep hill roads, A449 and lanes over the Malvern ridge`, market: `specialist hill-access and rural-property removals`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `Wychavon`, slug: "evesham", postcodes: `WR10, WR11`, postcode: `WR10`, borough: `Wychavon District`, region: `Worcestershire`, group: `Worcestershire & Beyond`, refs: ["Evesham","Pershore","Droitwich","Avon Vale villages"], housing: `period properties, village homes and houses with outbuildings`, access: `A46, A44 and rural Worcestershire lanes`, market: `rural removals across market towns and Avon Vale villages`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `South Staffordshire`, slug: "wombourne", postcodes: `WV5, WV8`, postcode: `WV5`, borough: `South Staffordshire District`, region: `Staffordshire`, group: `Staffordshire`, refs: ["Wombourne","Codsall","Perton","Kinver"], housing: `village properties, bungalows and executive rural homes`, access: `A449, A454 and lanes between Wolverhampton and Bridgnorth`, market: `outer South Staffordshire moves needing careful rural access planning`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `Staffordshire Moorlands`, slug: "leek", postcodes: `ST13, ST10`, postcode: `ST13`, borough: `Staffordshire Moorlands`, region: `Staffordshire`, group: `Staffordshire`, refs: ["Leek","Cheadle","Peak District fringe"], housing: `stone cottages, farmhouses and market-town terraces`, access: `A53, A520 and narrow Peak fringe lanes`, market: `full-day rural removals to Leek, Cheadle and surrounding villages`, isDistantArea: true, expandedExisting: false, priority: 0.6 },
  { name: `North Warwickshire`, slug: "coleshill", postcodes: `B46, B78, CV9`, postcode: `B46`, borough: `North Warwickshire Borough`, region: `Warwickshire`, group: `Coventry & Warwickshire`, refs: ["Coleshill","Atherstone","Polesworth"], housing: `character village homes, market-town terraces and new-build estates`, access: `M42, M6 Toll, A446 and rural village lanes`, market: `rural and market-town moves east of Birmingham`, isDistantArea: false, expandedExisting: false, priority: 0.7 },
];

function areaPrefix(area) {
  if (area.name.includes("/")) return area.name.split("/")[0];
  if (area.name.includes(" and ")) return area.name.split(" and ")[0];
  return area.name;
}

function sentenceJoin(items) {
  if (items.length <= 1) return items[0] || "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function buildMetaDescription(area) {
  const unique = uniqueContent[area.slug];
  if (unique?.metaDescription) {
    let text = unique.metaDescription;
    if (text.length > 155) text = text.slice(0, 154).replace(/[ ,.;:-]+$/, "") + ".";
    return text;
  }
  const refs = area.refs.slice(0, 2).join(" and ");
  const candidates = [
    `Fixed-price removals in ${area.name} ${area.postcodes}, covering ${refs}. House, flat and office movers with packing and local access planning.`,
    `Fixed-price removals in ${area.name} ${area.postcodes} near ${refs}. House and office movers with careful packing and access planning.`,
    `Removals in ${area.name} ${area.postcodes} near ${refs}. Fixed-price house, flat and office movers with careful packing.`,
  ];
  let text = candidates.find((c) => c.length <= 155) || candidates[candidates.length - 1];
  const pads = [" Free quote.", " Local crew.", " Book today.", " Fixed quote."];
  let i = 0;
  while (text.length < 145 && i < pads.length) text += pads[i++];
  if (text.length > 155) text = text.slice(0, 154).replace(/[ ,.;:-]+$/, "") + ".";
  return text;
}

function buildShortDescription(area) {
  return `Fixed-price removals across ${area.name} ${area.postcodes}, planned around ${area.refs.slice(0, 2).join(" and ")}.`;
}

function buildHeroSubtitle(area) {
  return `Serving ${area.name} (${area.postcodes}) and surrounding streets`;
}

function buildIntro(area) {
  const refs = sentenceJoin(area.refs.slice(0, 3));
  return `Fixed-price removals across ${area.name} ${area.postcodes}, covering ${refs} and nearby streets. We plan around ${area.housing} and the real access conditions on ${area.access}.`;
}

function buildOpening(area) {
  const unique = uniqueContent[area.slug];
  if (unique?.openingHook) {
    return [
      unique.openingHook,
      `The housing mix is ${area.housing}, so move planning can range from tight terrace access to larger driveway loads and careful furniture protection.`,
      `Our Birmingham-based crew quotes the job as a fixed price, confirms parking and access in advance, and brings the right van, covers and lifting kit for the address.`,
    ];
  }
  const first = area.slug === "lichfield"
    ? `${area.name} is a cathedral city north of Birmingham with a busy property market around ${sentenceJoin(area.refs.slice(0, 2))}.`
    : `${area.name} sits within ${area.borough}, serving movers across ${area.postcodes} and the streets around ${sentenceJoin(area.refs.slice(0, 2))}.`;
  return [
    first,
    `The housing mix is ${area.housing}, so move planning can range from tight terrace access to larger driveway loads and careful furniture protection.`,
    `Most enquiries come from ${area.market}, with customers upsizing, downsizing or completing property-chain moves where timing has to be exact.`,
    `Our Birmingham-based crew quotes the job as a fixed price, confirms parking and access in advance, and brings the right van, covers and lifting kit for the address.`,
  ];
}

function buildServices(area) {
  const n = area.name;
  const refs = area.refs.slice(0, 2).join(" and ");
  return [
    { slug: "house-removals", name: `House removals ${n}`, desc: `Full house removals in ${n} for ${area.housing}. We survey volume, access and parking before move day so the crew arrives with the right vehicle and enough time booked.` },
    { slug: "office-removals", name: `Office removals ${n}`, desc: `Business moves around ${refs} are planned to reduce downtime and protect IT, desks and files. We can work early, late or over a weekend when access and building managers allow it.` },
    { slug: "man-and-van", name: `Man and van ${n}`, desc: `Our man and van service suits single-room moves, small flats, student loads and furniture collections across ${n}. It is priced clearly before arrival and still includes blankets, straps and insured handling.` },
    { slug: "packing-service", name: `Packing service ${n}`, desc: `Full and part-packing is available for busy households, fragile kitchens, books, wardrobes and loft contents. We bring strong boxes, paper, tape and specialist wrap for mirrors, pictures and delicate pieces.` },
    { slug: "storage-solutions", name: `Storage and removals ${n}`, desc: `If completion dates do not line up, we can collect from ${n}, store securely, then deliver when keys are ready. This is useful for chain breaks, renovation gaps and staged downsizing.` },
    { slug: "piano-and-specialist-items", name: `Piano and specialist item removals ${n}`, desc: `Heavy, awkward or high-value items are assessed before lifting, especially in period homes and tight staircases. We use extra crew, protective wrap and planned routes for pianos, antiques, safes and large appliances.` },
  ];
}

function buildLocalParagraphs(area) {
  const unique = uniqueContent[area.slug];
  const refs = sentenceJoin(area.refs.slice(0, 4));
  const rural = area.isDistantArea || /rural|village|lanes|cottages|farmhouses|AONB|Peak/.test(area.housing + area.access + area.market);
  const accessDetail = rural
    ? `For rural addresses we check lane width, turning space, overhanging trees and whether a shuttle van is needed between the property and the main removal vehicle.`
    : `For town and suburban jobs we check yellow lines, school-run pressure, shared drives and whether a loading bay or neighbour agreement is needed.`;
  const paragraphs = [
    `Local work in ${area.name} is shaped by ${refs}. The area gives us a mixture of ${area.housing}, so the crew may be protecting original banisters in the morning and handling estate parking courts or modern driveways by the afternoon.`,
  ];
  if (unique?.localUnique) {
    paragraphs.push(unique.localUnique);
  } else {
    paragraphs.push(
      `Access usually comes down to ${area.access}. ${accessDetail} This is the difference between a smooth load and a van parked too far away for a heavy wardrobe or American fridge freezer.`,
    );
  }
  paragraphs.push(
    `${area.name} generates steady removal work because of ${area.market}. We regularly price moves to and from Birmingham, Solihull, the Black Country and further afield, building mileage, crew hours and packing into the written quote rather than adding surprises on the day. That planning also covers dismantling, lift checks, key-release timing and the order each room is loaded.`,
  );
  return paragraphs;
}

function buildWhyUs(area) {
  return [
    { title: `${areaPrefix(area)} access knowledge`, desc: `We plan around ${area.access} before the van leaves the yard, including parking, approach roads and realistic loading time.` },
    { title: "Fixed written prices", desc: `Your ${area.name} quote includes crew, vehicle, fuel, standard protection and agreed mileage, so the price does not creep up on move day.` },
    { title: "Fully insured crews", desc: "Goods-in-transit and public liability cover are included as standard, with DBS-checked movers handling furniture, boxes and specialist items." },
    { title: "Packing and storage options", desc: `We can add packing, materials, dismantling and short-term storage when your ${area.postcodes} move involves a chain delay, renovation or staged handover.` },
  ];
}

function buildFaqs(area) {
  const unique = uniqueContent[area.slug];
  const refs = area.refs.slice(0, 2).join(" and ");
  const distantAnswer = area.isDistantArea
    ? `Yes. We cover moves to and from ${area.name} as part of our wider West Midlands and nationwide service. It is usually a full-day job, and we price mileage, crew time and return travel into the fixed quote.`
    : `Yes. ${area.name} is inside our regular West Midlands coverage, and we quote ${area.postcodes} moves without hidden mileage charges.`;
  const generic = [
    { q: `How much do removals in ${area.name} cost?`, a: `Most ${area.name} moves are priced after we know the volume, access, floor levels and destination. Smaller man and van jobs are cheaper, while full-house moves with packing, storage or specialist items cost more; every quote is fixed in writing.` },
    { q: `Do you cover ${area.name} ${area.postcodes}?`, a: distantAnswer },
    { q: `Can you handle parking or access around ${refs}?`, a: `Yes. We check the loading position before the job, including restrictions, narrow streets, shared drives and any need to speak with neighbours, building managers or the council about access.` },
    { q: `What type of homes do you usually move in ${area.name}?`, a: `We commonly move ${area.housing} in and around ${area.name}. The equipment and crew size are matched to that property type, from stair protection in period homes to long-carry planning on estate roads.` },
    { q: "Can you provide packing materials and dismantling?", a: "Yes. We can supply boxes, tape, paper and wardrobe cartons, then dismantle and rebuild standard beds, wardrobes and tables when agreed as part of the quote." },
  ];
  if (Array.isArray(unique?.uniqueFaqs) && unique.uniqueFaqs.length >= 2) {
    // Lead with two hand-written area-specific FAQs, then three generic ones.
    return [unique.uniqueFaqs[0], unique.uniqueFaqs[1], generic[0], generic[1], generic[4]];
  }
  return generic;
}

function buildNearby(area) {
  const sameGroup = rawAreaPages.filter((candidate) => candidate.slug !== area.slug && candidate.group === area.group).slice(0, 6);
  const fallback = rawAreaPages.filter((candidate) => candidate.slug !== area.slug && candidate.region === area.region).slice(0, 6);
  return (sameGroup.length >= 4 ? sameGroup : fallback).slice(0, 6).map(({ slug, name }) => ({ slug, name }));
}

export const areaPages = rawAreaPages.map((area) => ({
  ...area,
  title: `Removals ${area.name} | Fixed-Price Movers | Birmingham Removals`,
  metaDescription: buildMetaDescription(area),
  canonical: `${BUSINESS.url}/areas/${area.slug}`,
  shortDescription: buildShortDescription(area),
  heroSubtitle: buildHeroSubtitle(area),
  intro: buildIntro(area),
  opening: buildOpening(area),
  services: buildServices(area),
  localParagraphs: buildLocalParagraphs(area),
  whyUs: buildWhyUs(area),
  faqs: buildFaqs(area),
})).map((area) => ({ ...area, nearby: buildNearby(area) }));

export const areaPagesBySlug = Object.fromEntries(areaPages.map((area) => [area.slug, area]));

export const areaCityEntries = Object.fromEntries(areaPages.map((area) => [
  area.slug,
  {
    name: area.name,
    postcodes: area.postcodes,
    postcode: area.postcode,
    borough: area.borough,
    region: area.region,
    tag: area.group,
    intro: area.intro,
    shortDescription: area.shortDescription,
    heroSubtitle: area.heroSubtitle,
    isDistantArea: area.isDistantArea,
    priority: area.priority,
    expandedExisting: area.expandedExisting,
  },
]));

export function getAreaPage(slug) {
  return areaPagesBySlug[slug] || null;
}
