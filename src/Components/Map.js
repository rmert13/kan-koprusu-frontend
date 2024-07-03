import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Marker ikonu ayarlaması
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Kızılay merkezlerinin koordinatları
const kizilayCenters = [
  { lat: 39.91916, lng: 32.85312, name: "Kızılay Meydan Kan Alma Birimi" },
  { lat: 40.77824, lng: 30.40071, name: "Sakarya Kan Alma Birimi" },
  { lat: 40.55029, lng: 34.95511, name: "Hitit Kan Alma Birimi" },
  { lat: 40.79900, lng: 29.43071, name: "Gebze Kan Alma Birimi" },
  { lat: 40.76618, lng: 29.94165, name: "İzmit Kan Alma Birimi" },
  { lat: 38.61400, lng: 27.42584, name: "Erzurum Kan Alma Birimi" },
  { lat: 40.55029, lng: 34.95511, name: "Dilaver Vardarer Kan Alma Birimi" },
  { lat: 39.78422, lng: 30.51496, name: "Adalar Kan Alma Birimi" },
  { lat: 40.20114, lng: 29.05982, name: "Bursa Kent Meydanı Kan Alma Birimi" },
  { lat: 41.03065, lng: 40.51761, name: "Rize Kan Alma Birimi" },
  { lat: 40.18790, lng: 29.06066, name: "Bursa Demokrasi Meydanı Kan Alma Birimi" },
  { lat: 39.90671, lng: 32.75579, name: "Ankara Şehir Hastanesi Kan Alma Birimi" },
  { lat: 39.94181, lng: 32.85615, name: "Anafartalar Kan Alma Birimi" },
  { lat: 37.76917, lng: 30.55461, name: "Isparta Kan Alma Birimi" },
  { lat: 36.80453, lng: 34.62382, name: "Akdeniz YAŞAMEVİKan Alma Birimi" },
  { lat: 36.78980, lng: 34.59399, name: "Forum Yaşamevi Kan Alma Birimi" },
  { lat: 39.92534, lng: 32.85384, name: "Karanfil Kan Alma Birimi" },
  { lat: 39.84659, lng: 33.50621, name: "Kırıkkale Kan Alma Birimi" },
  { lat: 37.33050, lng: 40.72056, name: "Mardin Artuklu Kan Alma Birimi" },
  { lat: 36.89745, lng: 30.70547, name: "Mark Antalya AVM Kan Alma Birimi" },
  { lat: 36.92065, lng: 34.89108, name: "Yarenlik Kan Alma Birimi" },
  { lat: 37.01265, lng: 35.35413, name: "Yüreğir Devlet Hastanesi Kan Alma Birimi" },
  { lat: 36.89623, lng: 30.70254, name: "Kapalı Yol Kan Alma Birimi" },
  { lat: 37.03412, lng: 35.31259, name: "Gençlik Meydanı Kan Alma Birimi" },
  { lat: 37.03412, lng: 35.31259, name: "Gençlik Meydanı Kan Alma Birimi" },
  { lat: 36.99056, lng: 35.32635, name: "İnönü Yaşamevi Kan Alma Birimi" },
  { lat: 37.03410, lng: 35.34027, name: "Adana Şehir Hastanesi Kan Alma Birimi" },
  { lat: 37.07564, lng: 36.25068, name: "Osmaniye Kan Alma Birimi" },
  { lat: 40.73357, lng: 31.59969, name: "Bolu Kan Alma Birimi" },
  { lat: 41.01052, lng: 39.72795, name: "Trabzon Kan Alma Birimi" },
  { lat: 39.97165, lng: 32.82914, name: "Etlik Şehir Hastanesi Kan Alma Birimi" },
  { lat: 40.92186, lng: 29.17143, name: "Sümer Günay Kan Alma Birimi" },
  { lat: 37.06518, lng: 37.37665, name: "Gaziantep Demokrasi Meydanı Kan Alma Birimi" },
  { lat: 37.06556, lng: 37.36181, name: "25 Aralık Kan Alma Birimi" },
  { lat: 37.06389, lng: 37.37109, name: "Karataş Kan Alma Birimi" },
  { lat: 37.01020, lng: 37.79650, name: "Okan Park Kan Alma Birimi" },
  { lat: 40.60698, lng: 43.09877, name: "Kars Kan Bağışı Merkezi Müdürlüğü" },
  { lat: 39.97062, lng: 32.57893, name: "Sincan Kan Alma Birimi" },
  { lat: 37.92807, lng: 40.17166, name: "Melahat-Halil Olguner Kan Alma Birimi" },
  { lat: 37.92352, lng: 40.21944, name: "Yenişehir Kan Alma Birimi" },
  { lat: 38.34574, lng: 38.32115, name: "Malatya İl Sağlık Müdürlüğü Kan Alma Birimi" },
  { lat: 36.38685, lng: 33.92964, name: "Silifke Kan Alma Birimi" },
  { lat: 36.55294, lng: 32.00517, name: "Alanya Kan Alma Birimi" },
  { lat: 41.29173, lng: 36.33233, name: "Çiftlik Kan Alma Birimi" },
  { lat: 37.91751, lng: 40.23678, name: "Ulucami Kan Alma Birimi" },
  { lat: 37.11558, lng: 38.82298, name: "Şanlıurfa EAH Kan Alma Birimi" },
  { lat: 37.88179, lng: 32.48637, name: "Selçuklu Kan Alma Birimi" },
  { lat: 41.01600, lng: 28.93386, name: "Çapa Kan Bağışı Merkezi Müdürlüğü" },
  { lat: 36.86363, lng: 28.26491, name: "Marmaris Kan Bağışı Merkezi Müdürlüğü" },
  { lat: 37.87340, lng: 32.50054, name: "Karatay Kan Alma Birimi" },
  { lat: 36.25649, lng: 36.16357, name: "Hatay Kan Alma Birimi" },
  { lat: 36.59774, lng: 36.16652, name: "İskenderun Kan Alma Birimi" },
  { lat: 37.36960, lng: 36.09729, name: "Kadirli Üçgen Park Kan Alma Birimi" },
  { lat: 37.22192, lng: 28.36357, name: "Muğla Kan Alma Birimi" },
  { lat: 37.85479, lng: 27.84330, name: "Aydın Kan Alma Birimi" },
  { lat: 37.85479, lng: 27.84330, name: "Denizli Kan Bağışı Merkezi Müdürlüğü" },
  { lat: 37.75910, lng: 29.09107, name: "Forum Kan Alma Birimi" },
  { lat: 38.68552, lng: 29.40405, name: "Uşak Belediyesi Kan Alma Birimi" },
  { lat: 41.37024, lng: 36.22786, name: "Atakum Sahil Kan Alma Birimi" },
  { lat: 41.28999, lng: 36.33494, name: "Sinop Kan Alma Birimi" },
  { lat: 41.02071, lng: 29.18972, name: "Çekmeköy Kan Bağış Merkezi" },
  { lat: 39.75391, lng: 39.49177, name: "Erzincan Kan Bağışı Merkezi Müdürlüğü" },
  { lat: 38.71740, lng: 35.49116, name: "Yoğunburç Kan Bağış Noktası" },
  { lat: 41.38936, lng: 33.77877, name: "Kastamonu Kan Bağışı Merkezi Müdürlüğü" },
  { lat: 38.49653, lng: 27.70569, name: "Turgutlu Kan Alma Birimi" },
  { lat: 40.48309, lng: 41.00007, name: "İspir Kaymakamlığı" },
  { lat: 39.90547, lng: 41.24342, name: "Atatürk Üniversitesi" },
  { lat: 39.77159, lng: 30.51853, name: "Valilik Meydanı Eskişehir" },
  { lat: 39.69294, lng: 35.50994, name: "Yozgat Cumhuriyet Meydanı" },
  { lat: 40.71356, lng: 30.27085, name: "Sapanca Halk Eğitim Merkezi " },
  { lat: 36.10379, lng: 32.96250, name: "Bozyazı Ortaokulu" },
  { lat: 39.27175, lng: 36.75034, name: "Altınyayla Meydan" },
  { lat: 41.15122, lng: 27.83564, name: "Çorlu Atatürk Heykeli" },
  { lat: 40.14989, lng: 26.40244, name: "Çanakkale İskele Meydan" },
  { lat: 39.93445, lng: 32.85466, name: "Sıhhiye Meydan " },
  { lat: 40.10820, lng: 27.65095, name: "Gönen Meydan" },
  { lat: 40.75364, lng: 29.82263, name: "Hikmet Uluğbay Ortaokulu" },
  { lat: 38.29727, lng: 31.17942, name: "Yalvaç Meydan" },
  { lat: 37.58544, lng: 36.89817, name: "Necip Fazıl Kısakürek Kültür Merkezi" },
  { lat: 37.54710, lng: 36.96664, name: "ÇMS Tekstil A.Ş " },
  { lat: 36.79277, lng: 31.44587, name: "Manavgat Köprübaşı" },
  { lat: 38.74118, lng: 41.49552, name: "Muş Meydan" },
  { lat: 40.86105, lng: 38.62476, name: "Yağlıdere Belediye Parkı" },
  { lat: 38.41910, lng: 27.12886, name: "Konak Meydanı" },
  { lat: 39.90681, lng: 32.91197, name: "Hüseyingazi Meydan" },
  { lat: 39.92790, lng: 32.89166, name: "Abidinpaşa Endüstri Meslek Lisesi" },
  { lat: 37.42168, lng: 41.36812, name: "Midyat Meydan" },
  //59 ve 88 arasını daha koordiantlarına ayırmadık
  { lat: 40.226582868687785, lng: 28.875967194921863, name: "Uludağ Üniversitesi, Bursa" },
  { lat: 38.501476298059124, lng: 43.39499651204106, name: "Cumhuriyet Caddesi, Van" },
  { lat: 40.19194878834965, lng: 29.10982392928784, name: "Özel Doruk Yıldırım Hastanesi, Bursa" },
  { lat: 40.226582868687785, lng: 28.875967194921863, name: "Uludağ Üniversitesi, Bursa" },
  { lat: 36.338717244301094, lng: 33.3991030421686, name: "Gülnar İlçe Meydanı, Mersin" },
  { lat: 38.45548149518162, lng: 27.119959367864997, name: "Karşıyaka İskele Yanı ,İzmir" },
  { lat: 36.91675010562896, lng: 31.10054883344261, name: "Serik Kaymakamlığı, Antalya" },
  { lat: 40.657821, lng: 29.268819, name: "Cevdet Aydın Parkı, Yalova" },
  { lat: 38.324432, lng: 43.407762, name: "Gürpınar Meydanı, Van" },
  { lat: 38.461390, lng: 27.187305, name: "Alija İzzetbegoviç Caddesi " },
  { lat: 41.406529, lng: 27.354042, name: "Kongre Meydanı, Lüleburgaz/Kırklareli" },
  { lat: 40.314302, lng: 36.550778, name: "Cumhuriyet Meydanı, Tokat" },
  { lat: 40.59134083295096, lng: 36.94445290600059, name: "Niksar Kaymakamlığı, Tokat" },
  { lat: 39.94155988113465, lng: 32.63862451209466, name: "Gimsa Market Piyade Şubesi, Ankara" },
  { lat: 40.944936338079756, lng: 40.268423981454085, name: "Çarşıbaşı Camii, Of/Trabzon" },
  { lat: 40.934607244030275, lng: 40.05024776611408, name: "Araklı Eski Belediye Önü," },
  { lat: 37.34075345027206, lng: 28.139623896659845, name: "Yatağan Otogarı, Muğla" },
  { lat: 40.65237666718719, lng: 35.834022342800765, name: "Yavuz Selim Meydanı, Amasya" },
  { lat: 36.89427577726867, lng: 30.637451569653315, name: "Siteler Mahallesi İlkokulu, Konyaaltı/Antalya" },
  { lat: 39.426294664594096, lng: 29.98126116722309, name: "Kütahya Meydanı" },
  { lat: 39.420778, lng: 29.955114, name: "Şehit Selman Çelik İlkokulu, Kütahya" },
  { lat: 38.714197, lng: 31.042237, name: "Bolvadin Meydanı, Afyonkarahisar" },
  { lat: 38.885740539694254, lng: 30.834359542894557, name: "Seydiler İlköğretim Okulu, Afyonkarahisar" },
  { lat: 38.65808433988821, lng: 39.77648273903757, name: "Etikrom, Elazığ" },
  { lat: 38.67504596383767, lng: 39.22221449018789, name: "Öğretmenevi Yanı, Elazığ" },
  { lat: 41.017350866202136, lng: 28.974116118339985, name: "Eminönü Meydanı, Fatih/İstanbul" },
  { lat: 37.0613815591479, lng: 37.383368094682076, name: " Alaybey Cami Önü Kan Alma Birimi, Gaziantep" },
  { lat: 37.089982, lng: 37.364526, name: " Şehitkamil Devlet Hastanesi Önü Kan Alma Birimi, Gaziantep " },
  { lat: 37.0412487567887, lng: 37.318036035582224, name: "Gaziantep Üniversitesi Tıp Fakültesi" },
  { lat: 37.015874, lng: 37.388391, name: "Gaziantep Şehir Hastanesi" },
  { lat: 41.034515900535894, lng: 28.6789725391272625, name: "Esenyurt Meydanı" },
  { lat: 41.42850579142295, lng: 27.09484738147291, name: "Fatih Camii Önü, Babaeski/Kırklareli" },
  { lat: 41.676320841617645, lng: 26.552896212161695, name: "Saraçlar Caddesi, Edirne" },
  { lat: 41.276121292222626, lng: 31.42488623913677, name: "Ereğli Meydanı, Zonguldak" },
  { lat: 41.36260036588063, lng: 41.67720090750692, name: "Borçka Cumhuriyet Meydanı, Artvin" },
  { lat: 40.9922200487595, lng: 28.846090527474463, name: "Cengiz Topel Camii, Bahçelievler/İstanbul" },
  { lat: 37.37755380907014, lng: 27.26717289666112, name: "Didim Merkez Camii Önü, Aydın" },
  { lat: 37.371588609502936, lng: 29.825706483165575, name: "Nimet Güvener İlköğretim Okulu Kan Alma Noktası, Burdur" },
  { lat: 39.97517696321711, lng: 32.722869725591345, name: "Batıkent Gimsa, Ankara" },
  { lat: 37.917575422880816, lng: 28.32797345250595, name: "Nazilli Meydanı, Aydın" },
  { lat: 37.755960509533786, lng: 27.407599267839586, name: "Söke Hükümet Meydanı, Aydın" },
  { lat: 40.1675110416244, lng: 31.921506410259067, name: "Beypazarı Meydanı Kan Alma Noktası, Ankara" },
  { lat: 41.034458, lng: 28.856546, name: "Bağcılar Meydanı Kan Alma Noktası" },
  { lat: 41.1825631447754, lng: 28.741977425637696, name: "Arnavutköy Merkez Camii Önü Kan Alma Noktası" },
  { lat: 38.754257273801755, lng: 34.61757942738986, name: "Gülşehir Meydanı Kan Alma Noktası, Nevşehir" },
  { lat: 38.34933453818302, lng: 2967070697052, name: "Malatyapark AVM" },
  { lat: 37.23292020389579, lng: 216645248152, name: "Viranşehir Kızılay Şube Binası Şanlıurfa" },
  { lat: 37.16423347106226, lng: 482353898378, name: "Şanlıurfa Toplama Meydanı Kan Alma Noktası" },
  { lat: 37.752129916122584, lng: 39.32651611201407, name: "Siverek Üçgen Park Kan Alma Noktası, Şanlıurfa" },
  { lat: 37.20442120696907, lng: 36.582309996654956, name: "Bahçe Belediyesi Önü Kan Alma Noktası, Osmaniye" },
  { lat: 41.06327391668457, lng: 28.99248358145861, name: "Cevahir AVM Önü Kan Alma Noktası, Şişli/İstanbul" },
  { lat: 39.789982899483405, lng: 32.811447081409796, name: "İnönü Ortaokulu, Gölbaşı/Ankara" },
  { lat: 39.43487291964148, lng: 32.49524434677006, name: "Haymana Meydanı, Ankara" },
  { lat: 38.23101124355412, lng: 28.457923527370706, name: "Cevizli Köyü Kan Alma Noktası, Kiraz/İzmir" }, { lat: 37.784331522954325, lng: 29.084021123666286, name: "Denizli Bayram Yeri Meydanı Kan Alma Noktası" },
  { lat: 37.45367375404581, lng: 28.366027519374192, name: "Kavaklıdere Belediyesi Önü Kan Alma Noktası, Muğla" },
  { lat: 40.01413902756819, lng: 30.184130767922973, name: "Söğüt Belediyesi Önü Kan Alma Noktası, Bilecik" },
  { lat: 37.77365351813466, lng: 29.086320225510107, name: "Çınar Meydanı Kan Alma Noktası, Denizli" },
  { lat: 37.758181664556524, lng: 29.09416262524693, name: "Nihat Zeybekçi Kongre ve Kültür Merkez, Denizli" },
  { lat: 40.986343, lng: 29.025519, name: "Kadıköy Meydanı Kan Alma Noktası" },
  { lat: 41.02629511703986, lng: 29.015234782146877, name: "Üsküdar Meydanı Kan Alma Noktası" },
  { lat: 41.026043986804765, lng: 29.011414396934796, name: "Üsküdar Şemsi Paşa Camii Kuşkonmaz Camii" },
  { lat: 41.09115886064775, lng: 29.091495469808518, name: "Medipol Üniversitesi Kuzey Kampüsü, Beykoz/İstanbul" },
  { lat: 41.079842490105996, lng: 28.786541198679735, name: "İOSB Aymakoop Sanayi Sitesi, Başakşehir/İstanbul" },
  { lat: 41.06896005471065, lng: 28.80032612563333, name: "İkitelli Organiza Sanayi Bölgesi Metal İş Sanayi Sitesi, Başakşehir/İstanbul" },
  { lat: 40.96234810534144, lng: 29.08879332562907, name: "Suadiye Hacı Mustafa Tarman Anadolu Lisesi, Kadıköy/İstanbul" },
  { lat: 37.102510953463565, lng: 28.41668283709002, name: "Ula Merkez Cami, Muğla" },
  { lat: 41.10641096431903, lng: 28.872562010295226, name: "Sultan Town Outlet AVM, Sultangazi/İstanbul" },
  { lat: 41.02533121241737, lng: 29.091735191442353, name: "Ümraniye Meydanı" },
  { lat: 37.97000864430642, lng: 34.675248106468295, name: "Niğde Meydan" },
  { lat: 40.86299135723626, lng: 31.151955717535902, name: "Düzce Merkez Cami" },
  { lat: 40.915494976854674, lng: 29.193256500480814, name: "Burak Bora Anadolu Lisesi Önü, Kartal/İstanbul" },
  { lat: 40.893444687115085, lng: 31.04717933848929, name: "Çilimli Meydanı, Düzce" },
  { lat: 41.094481896676854, lng: 40.72468713933458, name: "Çayeli Meydanı, Rize" },
  { lat: 37.870699178808955, lng: 32.48836002326079, name: "Erbil Koru Meydanı, Konya" },
  { lat: 37.858020016501015, lng: 32.55034798035071, name: "Konya Şehir Hastanesi" },
  { lat: 36.63892864362628, lng: 32.8829404167143, name: "Ermenek Meydan, Karaman" },
  { lat: 37.41994979234855, lng: 31.845115611848517, name: "Seydişehir Meydanı, Konya" },
  { lat: 39.46410989326334, lng: 38.55991142431004, name: "İliç Dursun Yıldırım MYO" },
  { lat: 41.02352391392486, lng: 37.47558318388774, name: "Necip Fazıl Kısakürek Anadolu Lisesi Önü, Ordu" },
  { lat: 40.978118946147426, lng: 27.503704765927992, name: "Tekira Avm Önü, Tekirdağ" },
  { lat: 40.985506, lng: 29.229535, name: "Samandıra Meydanı, Sancaktepe/İstanbul" },
  { lat: 38.721775454287915, lng: 35.49392604773662, name: "Hunat Meydanı, Kayseri" },
  { lat: 38.76853364335388, lng: 35.40976789671122, name: "Kayseri Şehir Hastanesi" },
  { lat: 38.799222, lng: 26.968656, name: "Aliağa Demokrasi Meydanı, İzmir" },
  { lat: 38.42353645791974, lng: 27.433719081943124, name: "Kemalpaşa Meydanı, İzmir" },
  { lat: 38.78534272900444, lng: 35.61611976846276, name: "Hakkı Altop İlkokulu, Kayseri" },
  { lat: 37.712018210997215, lng: 41.410242051730314, name: "Hasankeyf Meydanı, Batman" },
  { lat: 40.7720258231815, lng: 29.985709310864994, name: "Sabancı Mesleki ve Teknik Anadolu Lisesi Önü, İzmit/Kocaeli" },
  { lat: 38.9221365655262, lng: 27.839718841481034, name: "Akhisar Kaymakamlığı Önü, Manisa" },
  { lat: 41.118717296288004, lng: 28.961197266188876, name: "Dayehatun Camii Önü, Kağıthane/İstanbul" },
  { lat: 38.349712353347115, lng: 28.526834997282773, name: "Alaşehir Belediyesi Sevgi Yolu, Manisa" },
  { lat: 41.13743485590942, lng: 28.693282938130178, name: "Avcılar Merkez Ulu Camii Önü, Avcılar/İstanbul" },
  { lat: 39.218682340205575, lng: 42.84712991265623, name: "Veysel Karani Cami Önü, Ağrı" },
  { lat: 39.23579462186095, lng: 42.858097710808, name: "Patnos Kaymakamlık Önü, Ağrı" },
  { lat: 41.03703032609334, lng: 28.984130335582233, name: "Taksim Cami Önü, Beyoğlu/İstanbul" },
  { lat: 41.020199, lng: 28.935867, name: "Aksaray Meydan Ekibi Kan Alma Birimi, Fatih/İstanbul" },
  { lat: 37.06600961462512, lng: 37.3714187175601, name: "YKM Önü, Gaziantep" },
  { lat: 41.01010814553876, lng: 28.657886503301228, name: "Beylikdüzü Meydan Kan Alma Birimi, İstanbul" },









  // Diğer Kızılay merkezlerini buraya ekleyebilirsiniz
];

// Türkiye sınırları
const bounds = [
  [36, 26], // Güneybatı köşesi
  [42, 45]  // Kuzeydoğu köşesi
];

const MapComponent = ({ kanArayanlar }) => {
  return (
    <MapContainer
      center={[39.92077, 32.85411]}
      zoom={6}
      minZoom={6}
      maxZoom={13}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {kizilayCenters.map((center, index) => (
        <Marker key={index} position={[center.lat, center.lng]}>
          <Popup>
            <strong>{center.name}</strong>
          </Popup>
        </Marker>
      ))}
      {kanArayanlar.filter(person => person.lat && person.lng).map((person, index) => (
        <Marker key={index} position={[person.lat, person.lng]} icon={redIcon}>
          <Popup>
            <strong>{person.firstName} {person.lastName}</strong><br />
            {person.city }, {person.district  }
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
