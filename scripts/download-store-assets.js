const https = require('https');
const fs = require('fs');
const path = require('path');

const apps = {
  pdf: {
    folder: 'public/projects/pdf',
    // og:image = real icon, strip =s0-br30 suffix and request full size
    icon: 'https://play-lh.googleusercontent.com/UbvbweNA_RXlThwfNBFAe6dAPVOIne2hRwsxos7-iNy5Q9AJpaapxcLdIt0ridIYwgIuedrJ30omwXA3q7U2sg',
    screenshots: [
      'https://play-lh.googleusercontent.com/pHtIujPWxciAZcfYSwlrGGq14Z984rKLMgcm9RPATLiOlbrWy-tVlelEWgED7gpktgcD1tZizVeHiO5fkw',
      'https://play-lh.googleusercontent.com/aWNKQedLTpw6u6yyMjQObmuoKu67A1czWnIcvID86oAmMT02r5mNdRn6l9ZN2t2MIyH6tNy-01v7ukeQ',
      'https://play-lh.googleusercontent.com/xbP_oGuJ21iG29iVh0p-UIZPzi_fYj8PMYiqDd9-LvaZ_a1tRcwp0I2-arfXvgX9YtfZTTaqwcLRWPNQM_c',
      'https://play-lh.googleusercontent.com/pkKXoPl5q7n8T0s7KREtdvUZn1PLRgx-Ox0t4tkO8af4JpgGbyAxLBTsvEKKBCjwBACQsZisSYNmHPGbBA',
      'https://play-lh.googleusercontent.com/My7LALjTl1IK9IgCIsF2C6yo6s_fusog_I58J9PZA-pujFx3aKjN2GVCcGHmfVJw-V3xfMfCvLZSAbT1KFAdyGk',
      'https://play-lh.googleusercontent.com/haCjMpwXoqbJeotHYbcTPkZ6oJX-ENIEbGMpgoJRd18DcZBVXaVpqtBOQQobCmzUKRX5oycL8Qw',
      'https://play-lh.googleusercontent.com/KUnvVSJGOe7oq-qW-E5kFNOMgfk4GkOp7wEyi6tVFOkrUJJzYSH-Gxr_nto-DH5VMBjLIFGRaMA',
      'https://play-lh.googleusercontent.com/HdoJQCOr722dlswL1aNdd_HQekTVWzmMCzapvLyaf7JpvMx4TlPcKZgDaf7W3x2g52Z0kK0jJOchmMXKjhNVsQ',
      'https://play-lh.googleusercontent.com/2GFUxjpc8rKHRQuG8udFqyuXb2VVITi0Orb6XWknMOmnJzvlcFSkwFlr3ZLAEbqqQCJxNfupWHZQlbU17FJRJA',
      'https://play-lh.googleusercontent.com/UMgdT9cYbRzmfEwFFEsa3pgc69YJalb8Lvr_z83cx4puncX8FDE1Txww7NVYn8VYV4_13ybwWZk03tAHuWf4Rg',
      'https://play-lh.googleusercontent.com/UwvcSNu95LDdi6o3zp5dwyI8pvuiFcZiWV_4YJtqSvfYLXpZ6FGDnnXlTtEFFcWMGB-U-a8XXYGnogo4twUBAw',
      'https://play-lh.googleusercontent.com/Yq7oyNIvAAkuc69fG51sbAQS4otJxbObbt3xdr8tXxXyUdq4tVGtfgeKuptveGdP1srxaHVrNPzOYcfaEQ',
    ]
  },
  qr: {
    folder: 'public/projects/qr',
    icon: 'https://play-lh.googleusercontent.com/kR-4ENJtFEIUXBGmyzyrvI0lk9EbDQmVmdhkaDT2HFxi_ejJplJjDnrV2hEevZXjrAht9ZJZhe0McdBPDZki7w',
    screenshots: [
      'https://play-lh.googleusercontent.com/piGIUCl14kXFpbBpjUYu5PlWNFXSmGEHm7o5Zxw3vWUpsIpGUoUSzRJeEqAcH3IBVryTVsXTwR5F1smmSCaIysc',
      'https://play-lh.googleusercontent.com/mSbx8mayMf_ETZAh0NbWSqk4gGoeEeWh-CFE08ywwEcInvr_Lm60wEX4vRgH1l1mE5n0Z9c-CMAHJKKsyYHnhQ',
      'https://play-lh.googleusercontent.com/1KKjcpwv-nJB-7I8K6-2E6vuYpNOaoQumUW9whT2oT43-y_94JgaykYazCWdAJDV7xblLTSrDGNzNK9bq8t_',
      'https://play-lh.googleusercontent.com/NPHNH9hLNmWnAIDMc_qTF2X0ZeIolJWMqWPrwmZEasHmFxb84Uzvc7L2ZeTFEhmQktuG2oNh8y1fNcrG5uyLG4U',
      'https://play-lh.googleusercontent.com/bZ7HBlUjxuYW7IeJDc5FX7XzrNAzM17_sGFsSQuLczt04QRSU9gExycXAoxZnTSQpVgsn0EAv4rh1-mGAjK1',
      'https://play-lh.googleusercontent.com/p16Px1T33mkxAeYcGoOjCrw1nrY7P6KDY6Ksi3Kf_tlXUPJm-szrTgd-KKJYt9GUT-Vb93vmowpJculNaqu8Gw',
      'https://play-lh.googleusercontent.com/pYe6YlJp1oEwSytVRAJNeRCfY7pHcd3D2Pl8q3xrIEaHG-9AJuaMbILc0RjU8AEnQ79woO38JoOnOGGDWy25xrc',
      'https://play-lh.googleusercontent.com/8g-VTSUCe5Ocg3c6aEw-oKwFxmUgrnxpvwaGBTNRkxhJC4dzHfGJH-n-jOCub7q8IhO8qQZVb0qoq_JWk7Vt_w',
      'https://play-lh.googleusercontent.com/HB6i6zJsHAy48TjoAVyJLEBNw-AWGvqgWWaqjrXWRG65glqLlbl5icq7ZHNI3bypTrQBvaoP05ijvwygcF0PDQ',
      'https://play-lh.googleusercontent.com/uuXq5YVWF0eSqdrlmF2sZil7djgwbFWY1ROxUp01Ilt1ZZsfjrmz-Xjfhl_wIVxDZbMWf1ZdY7zwDo-FR5aY',
      'https://play-lh.googleusercontent.com/QJtnrXHxXxmK_4ZF0-oM4nxYOq07gFobfydNMr_5Zz6LPqAgOfZh0pGb9TmJ_P7-4kmbpy7hEv-fllkL_owz',
      'https://play-lh.googleusercontent.com/JB-UUhAtLiwRhhCIPlHQK8DYvIIz5cLEq1xSa8asPUtfkbtwjekdg276Qd7RPkwb8XEZgRfALTFWELk05uNKTg',
    ]
  },
  healthful: {
    folder: 'public/projects/healthful',
    icon: 'https://play-lh.googleusercontent.com/GGGW1YBShvS44dU2uAfKwEljI2NdzJv-6IHTt3IPPdx7-VWv-PdjAx9kfNy7Gg_aZ3iEx2Ir-1kgvLjEQvwMiRw',
    screenshots: [
      'https://play-lh.googleusercontent.com/EbEX3AN4FC4pu3lsElAHCiksluOVU8OgkgtWC43-wmm_aHVq2D65FmEM97bPexilUAvlAY5_4ARH8Tb3RxQ',
      'https://play-lh.googleusercontent.com/U-_SG8pHTsqU_IyZTGQRkVMdLaAUeq1OnKGrB06KHF1z7vkkIQK3iF0HcbfTe1RnGlh-ajnZkbphl2W3Gdk',
      'https://play-lh.googleusercontent.com/POxcn01uf7VPYzG0CjdpvE75To0n-cXZpYMz6AkKpBfa5XXHPF58-7OTN6j99Kig-VXbb-g2YE4-1i8H1pxcCA',
      'https://play-lh.googleusercontent.com/pkKXoPl5q7n8T0s7KREtdvUZn1PLRgx-Ox0t4tkO8af4JpgGbyAxLBTsvEKKBCjwBACQsZisSYNmHPGbBA',
      'https://play-lh.googleusercontent.com/haCjMpwXoqbJeotHYbcTPkZ6oJX-ENIEbGMpgoJRd18DcZBVXaVpqtBOQQobCmzUKRX5oycL8Qw',
      'https://play-lh.googleusercontent.com/KUnvVSJGOe7oq-qW-E5kFNOMgfk4GkOp7wEyi6tVFOkrUJJzYSH-Gxr_nto-DH5VMBjLIFGRaMA',
      'https://play-lh.googleusercontent.com/zZBup5-kH4XA1ah4KQhyK5zK1z5_oHdN4H9eqXGC4O4CpfVWHzBvgJSL-T-xcQO54gCeNS33gw',
      'https://play-lh.googleusercontent.com/N6JWKL8wk5_U9DgAQ9iNJY7R_4wd4PG71_lQX97JVU4tq5wKBG2MmjNmbeGLQLFkSMsJkYNufrx6',
    ]
  }
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // Request high-res version
    const fullUrl = url.includes('=') ? url : `${url}=w1080`;
    const file = fs.createWriteStream(dest);
    const req = https.get(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0' }
    }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', err => { fs.unlink(dest, () => {}); reject(err); });
    file.on('error', err => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function main() {
  for (const [appName, config] of Object.entries(apps)) {
    const folder = path.resolve(config.folder);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    console.log(`\n📦 ${appName}`);

    // Download icon as logo.png
    try {
      await downloadFile(config.icon, path.join(folder, 'logo.png'));
      console.log(`  ✓ logo.png (app icon)`);
    } catch (e) {
      console.error(`  ✗ logo.png: ${e.message}`);
    }

    // Download screenshots
    for (let i = 0; i < config.screenshots.length; i++) {
      const dest = path.join(folder, `image${i + 1}.png`);
      try {
        await downloadFile(config.screenshots[i], dest);
        console.log(`  ✓ image${i + 1}.png`);
      } catch (e) {
        console.error(`  ✗ image${i + 1}.png: ${e.message}`);
      }
    }
  }
  console.log('\n✅ Done!');
}

main();
