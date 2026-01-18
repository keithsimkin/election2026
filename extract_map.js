import fs from 'fs';
import path from 'path';

const svgPath = path.join(process.cwd(), 'src', 'assets', 'ug.svg');
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Regex to find paths with id and name
const pathRegex = /<path d="([^"]+)" id="([^"]+)" name="([^"]+)">/g;
let match;
const districts = [];

while ((match = pathRegex.exec(svgContent)) !== null) {
    districts.push({
        d: match[1],
        id: match[2],
        name: match[3]
    });
}

// Map the extracted districts to regions (simplified mapping for demo)
// In a real app, we'd have a proper mapping table
const regions = {
    central: ["Kampala", "Wakiso", "Mukono", "Luwero", "Masaka", "Mpigi", "Kayunga", "Buikwe", "Mityana", "Gomba", "Butambala", "Buvuma", "Kalangala", "Kalungu", "Kiboga", "Kyankwanzi", "Lyantonde", "Lwengo", "Mubende", "Nakaseke", "Nakasongola", "Rakai", "Sembabule", "Bukomansimbi"],
    western: ["Mbarara", "Kabale", "Bushenyi", "Kasese", "Fort Portal", "Hoima", "Rukungiri", "Ntungamo", "Ibanda", "Kiruhura", "Buhweju", "Buliisa", "Bundibugyo", "Bunyangabu", "Isingiro", "Kabarole", "Kagadi", "Kakumiro", "Kamwenge", "Kanungu", "Kazo", "Kibaale", "Kikuube", "Kisoro", "Kitagwenda", "Kyegegwa", "Kyenjojo", "Masindi", "Mitooma", "Ntoroko", "Ntungamo", "Rubanda", "Rubirizi", "Rwampara", "Sheema"],
    eastern: ["Jinja", "Mbale", "Soroti", "Tororo", "Busia", "Kapchorwa", "Iganga", "Kamuli", "Bugiri", "Pallisa", "Amuria", "Budaka", "Bududa", "Bugweri", "Bukedea", "Bukwo", "Bulambuli", "Butaleja", "Butebo", "Buyende", "Kaberamaido", "Kalaki", "Kaliro", "Kapelebyong", "Katakwi", "Kibuku", "Kumi", "Kween", "Luuka", "Manafwa", "Mayuge", "Namayingo", "Namisindwa", "Namutumba", "Ngora", "Serere", "Sironko"],
    northern: ["Gulu", "Lira", "Arua", "Kitgum", "Nebbi", "Moyo", "Adjumani", "Koboko", "Yumbe", "Apac", "Abim", "Agago", "Alebtong", "Amolatar", "Amudat", "Amuru", "Dokolo", "Kaabong", "Karenga", "Kole", "Kotido", "Kwania", "Lamwo", "Madi-Okollo", "Maracha", "Moroto", "Nabilatuk", "Nakapiripirit", "Napak", "Obongi", "Omoro", "Otuke", "Oyam", "Pader", "Pakwach", "Terego", "Zombo"]
};

// Assign regions to districts
const districtsWithRegion = districts.map(d => {
    let region = "northern"; // Default
    for (const [reg, names] of Object.entries(regions)) {
        if (names.some(n => d.name.includes(n))) {
            region = reg;
            break;
        }
    }
    return { ...d, region };
});

const outputPath = path.join(process.cwd(), 'src', 'data', 'ugandaMap.json');
fs.writeFileSync(outputPath, JSON.stringify(districtsWithRegion, null, 2));

console.log(`Extracted ${districts.length} districts to ${outputPath}`);
