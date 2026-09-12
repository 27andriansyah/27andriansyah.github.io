const g=(names,subcategory,unit)=>names.map(name=>[name,subcategory,unit]);
const SAYUR=[
...g(['Bawang Merah','Bawang Putih','Bawang Bombay','Bawang Prei','Bawang Daun','Bawang Lokio'],'Bumbu','kg'),
...g(['Cabai Rawit Merah','Cabai Rawit Hijau','Cabai Merah Keriting','Cabai Merah Besar','Cabai Hijau Besar','Cabai Hijau Keriting','Cabai Gendot','Cabai Jalapeno','Cabai Keriting Hijau','Cabai Rawit Kuning','Cabai Paprika Merah','Cabai Paprika Hijau','Cabai Paprika Kuning'],'Cabai','kg'),
...g(['Tomat Merah','Tomat Hijau','Tomat Ceri','Tomat Beef','Tomat Roma'],'Sayuran','kg'),
...g(['Kentang','Kentang Baby','Ubi Jalar Merah','Ubi Jalar Putih','Ubi Jalar Ungu','Singkong','Talas','Ubi Cilembu','Ubi Madu','Ubi Jepang','Ganyong','Garut'],'Umbi','kg'),
...g(['Wortel','Lobak','Bit','Radish','Turnip'],'Sayuran','kg'),
...g(['Kubis','Kubis Ungu','Sawi Hijau','Sawi Putih','Sawi Keriting','Pakcoy','Pakcoy Mini','Pakcoy Merah','Kangkung','Bayam Hijau','Bayam Merah','Selada Hijau','Selada Romaine','Selada Keriting','Selada Iceberg','Kailan','Kale'],'Sayuran','kg'),
...g(['Kacang Panjang','Buncis','Buncis Baby','Kacang Kapri','Kacang Polong','Kacang Koro','Kecipir','Timun','Timun Jepang','Timun Mini','Labu Siam','Labu Kuning','Labu Parang','Labu Air','Pare','Oyong/Gambas'],'Sayuran','kg'),
...g(['Jagung Manis','Jagung Putren','Jagung Pipil Segar','Jagung Baby','Kembang Kol','Brokoli','Brokoli Baby','Romanesco','Terong Ungu','Terong Hijau','Terong Bulat','Terong Lalap'],'Sayuran','kg'),
...g(['Tauge','Rebung','Nangka Muda','Pepaya Muda','Daun Singkong','Daun Pepaya','Daun Katuk','Daun Kelor','Daun Pakis','Daun Kemangi','Daun Salam','Daun Jeruk','Daun Pandan','Daun Bawang','Seledri','Daun Ketumbar','Daun Mint'],'Daun','ikat'),
...g(['Jamur Tiram','Jamur Kuping','Jamur Kancing','Jamur Enoki','Jamur Shimeji Putih','Jamur Shimeji Cokelat','Jamur Portobello','Jamur Merang'],'Jamur','kg'),
...g(['Edamame','Petai','Petai Kupas','Jengkol','Melinjo','Kacang Tanah Segar','Kedelai Edamame'],'Kacang & Pelengkap','kg'),
...g(['Daun Pisang','Bunga Pepaya','Bunga Kecombrang','Jantung Pisang','Rebung Muda','Labu Siam Muda'],'Pelengkap','ikat'),
...g(['Jahe','Jahe Merah','Kunyit','Lengkuas','Serai','Kencur','Kencur Muda','Kemiri','Ketumbar','Lada Putih','Lada Hitam','Kapulaga','Cengkeh','Kayu Manis','Pala','Jeruk Nipis','Jeruk Limau','Asam Jawa','Asam Kandis','Biji Ketumbar'],'Bumbu','kg'),
...g(['Bahan Sop Komplit','Bahan Capcay Komplit','Bahan Sayur Asem','Bahan Sayur Lodeh','Bahan Tumis','Bahan Sayur Bayam','Bahan Soto','Bahan Rawon'],'Paket Sayur','paket'),
...g(['Kacang Tolo','Kacang Panjang Potong','Jagung Pipil','Wortel Potong','Brokoli Potong','Buncis Potong'],'Siap Masak','paket')
];
const POKOK=[
...g(['Beras Premium 5 kg','Beras Premium 10 kg','Beras Premium 25 kg','Beras Medium 5 kg','Beras Medium 10 kg','Beras Medium 25 kg','Beras SPHP 5 kg','Beras Pulen 5 kg','Beras Ramos 5 kg','Beras Pandan Wangi 5 kg','Beras Setra Ramos 5 kg','Beras Japonica 1 kg','Beras Merah 1 kg','Beras Hitam 1 kg','Beras Ketan Putih 1 kg','Beras Ketan Hitam 1 kg','Beras Porang 1 kg','Beras Organik 1 kg','Beras Premium 2,5 kg','Beras Medium 2,5 kg'],'Beras','kemasan'),
...g(['Jagung Pipil Kering','Jagung Pipil Kuning','Jagung Kering','Sorgum','Oat','Gandum Utuh'],'Serealia','kg'),
...g(['Tepung Terigu Protein Rendah','Tepung Terigu Protein Sedang','Tepung Terigu Protein Tinggi','Tepung Serbaguna','Tepung Tapioka','Tepung Sagu','Tepung Beras','Tepung Ketan','Tepung Maizena','Tepung Panir','Tepung Singkong','Tepung Mocaf','Tepung Jagung','Tepung Hunkwe','Tepung Garut','Tepung Kentang','Tepung Tempura','Tepung Bumbu'],'Tepung','kemasan'),
...g(['Gula Pasir','Gula Pasir 500 g','Gula Halus','Gula Kastor','Gula Merah','Gula Aren','Gula Jawa','Gula Batu','Gula Cair'],'Gula','kemasan'),
...g(['Minyak Goreng Premium 1 L','Minyak Goreng Premium 2 L','Minyak Goreng Kita 1 L','Minyak Goreng Kita 2 L','Minyak Goreng Curah','Minyak Kelapa','Minyak Jagung','Minyak Kanola','Minyak Wijen','Minyak Zaitun'],'Minyak & Lemak','kemasan'),
...g(['Garam Halus','Garam Beryodium','Garam Kasar','Garam Laut','Garam Himalaya'],'Bumbu Dapur','kemasan'),
...g(['Kecap Manis 600 ml','Kecap Manis 135 ml','Kecap Asin','Kecap Inggris','Saus Sambal','Saus Tomat','Saus Tiram','Saus Teriyaki','Saus Barbeque','Cuka Masak','Cuka Apel'],'Bumbu Dapur','kemasan'),
...g(['Santan Instan 65 ml','Santan Instan 200 ml','Santan Cair 1 L','Santan Bubuk','Kelapa Parut','Kelapa Utuh'],'Bahan Masak','kemasan'),
...g(['Telur Ayam Ras','Telur Ayam Ras 10 Butir','Telur Ayam Kampung','Telur Ayam Kampung 10 Butir','Telur Bebek','Telur Puyuh','Telur Omega'],'Telur','kemasan'),
...g(['Daging Ayam Broiler','Daging Ayam Kampung','Daging Ayam Fillet','Daging Ayam Potong','Daging Sapi','Daging Sapi Giling','Daging Kambing','Daging Sapi Has','Daging Sapi Tetelan'],'Protein','kg'),
...g(['Ikan Kembung','Ikan Tongkol','Ikan Bandeng','Ikan Lele','Ikan Nila','Ikan Mujair','Ikan Tuna','Ikan Patin','Ikan Teri','Ikan Gurame','Ikan Mas','Ikan Bawal','Ikan Kakap','Ikan Sarden','Ikan Tenggiri'],'Ikan','kg'),
...g(['Udang','Cumi-Cumi','Kerang','Kepiting'],'Seafood','kg'),
...g(['Tahu Putih','Tahu Kuning','Tahu Sutra','Tahu Pong','Tempe Kedelai','Tempe Bungkus Daun','Tempe Gembus'],'Protein','papan'),
...g(['Kacang Tanah','Kacang Tanah Kupas','Kacang Hijau','Kacang Kedelai','Kacang Merah','Kacang Mede','Kacang Polong Kering','Kacang Tolo','Kacang Arab','Kacang Koro'],'Kacang','kg'),
...g(['Mie Instan Goreng','Mie Instan Kuah','Mie Instan Cup','Mie Telur','Bihun','Soun','Makaroni','Spaghetti','Pasta Macaroni','Kulit Pangsit','Kulit Lumpia'],'Makanan Pokok','kemasan'),
...g(['Sarden Kaleng','Kornet Sapi','Tuna Kaleng','Kacang Polong Kaleng','Jagung Kaleng','Jamur Kaleng'],'Makanan Kaleng','kaleng'),
...g(['Baking Powder','Soda Kue','Baking Soda','Vanili','Ragi Instan','Bubuk Kakao','Cokelat Bubuk','Tepung Custard','Gula Donat','Meses Cokelat','Meses Warna'],'Bahan Kue','kemasan'),
...g(['Bawang Goreng','Kerupuk Udang','Kerupuk Putih','Emping Melinjo','Kerupuk Kulit','Abon Sapi','Abon Ayam','Serundeng'],'Pelengkap','kemasan'),
...g(['Madu','Selai Kacang','Selai Stroberi','Selai Cokelat','Susu Bubuk','Susu Kental Manis','Susu UHT'],'Pelengkap','kemasan')
];
const make=(arr,prefix,cat)=>arr.map((x,i)=>({id:`${prefix}${String(i+1).padStart(3,'0')}`,name:x[0],subcategory:x[1],unit:x[2],category:cat,badge:i<(cat==='Sayuran & Bumbu'?60:70)?'TERLARIS':'POPULER'}));
window.KATALOG_PRODUK=[...make(SAYUR,'SV','Sayuran & Bumbu'),...make(POKOK,'BP','Bahan Pokok')];
