const https = require('https');
const fs = require('fs');
const path = require('path');

// Screenshot URLs extracted from Play Store listings
const apps = {
  pdf: {
    folder: 'public/projects/pdf',
    // First URL = icon/feature image, rest = screenshots
    urls: [
      'https://play-lh.googleusercontent.com/_re6mcALPaqotePA0WkgYeOQ6TighHRUS62FRmREPEhyZPdGM3QmRjcSpiMt6Pz1O-WZyvEIy4mtGHj9zw', // icon → main/feature
      'https://play-lh.googleusercontent.com/03TTQMx3tDZmy0xzPIa0LJ-8ecGoKqhTxlA7gBRrMTXjur7mynt7XhiG5edupez4Ii9bGjeof6ZzgBR855D7iA',
      'https://play-lh.googleusercontent.com/15A0VZbn1VySs6VDdSoHEqPOLYT88_qDvzimqt28rus0FKtlqh2beFPARoq-ZmuCFil6lZiRBVnlvtxKE0-UxpM',
      'https://play-lh.googleusercontent.com/1rC5fqsjV6-3XSAJgw1SQXHIK2jn5cO5VB6_EfJOyOC6D4ZEQhpXB9SXbCU3jJzd7-paKaDrZ_sxX8ayp1iihg',
      'https://play-lh.googleusercontent.com/2GFUxjpc8rKHRQuG8udFqyuXb2VVITi0Orb6XWknMOmnJzvlcFSkwFlr3ZLAEbqqQCJxNfupWHZQlbU17FJRJA',
      'https://play-lh.googleusercontent.com/2HTQ-JtPs2snW3FEavChfgx4QkVLhLM9BKJJrN7eJBKykFVb9fTW0ZjIMftagY1l5EB-veEQ1hGRB-bQZXt3rV8',
      'https://play-lh.googleusercontent.com/2Qa4NOxwfPOTrFUcacUbe_-p6602TC1wJcUXWCiACr9k1JqBcFSha5EFAQBEsY9KtA5iLLTH8TzTog4xhsuIPu8',
      'https://play-lh.googleusercontent.com/4vR7HYzgCUlZpivIbNZeShGJDmdiQlwvNCQbvzfeke8o9vFNndMFcgoGUOH3dRCLiwGbD6jOxy3q42kqy7hkVA',
      'https://play-lh.googleusercontent.com/5Ez7lJv_Zvjn9E680krG5A9biYeHXSLoYibPZATs0-Rs9Y3lgTIMrmh_Qob7PIVrxfQ153nkhn3arMLEcfO4LA',
      'https://play-lh.googleusercontent.com/6FBr_cdugqYZEO-z8uYfeovSDNRJX7McUifkALUp5WnOmhxHhTApNT8mpfGPZxhew8MXofiPj0OF1DrACQC1Ng',
    ]
  },
  healthful: {
    folder: 'public/projects/healthful',
    urls: [
      'https://play-lh.googleusercontent.com/_re6mcALPaqotePA0WkgYeOQ6TighHRUS62FRmREPEhyZPdGM3QmRjcSpiMt6Pz1O-WZyvEIy4mtGHj9zw', // icon → main/feature
      'https://play-lh.googleusercontent.com/GGGW1YBShvS44dU2uAfKwEljI2NdzJv-6IHTt3IPPdx7-VWv-PdjAx9kfNy7Gg_aZ3iEx2Ir-1kgvLjEQvwMiRw',
      'https://play-lh.googleusercontent.com/JYVkjT_ySlOOzgLfL5I3kLw5VPOYSUTDavpwfaVi_py4FIsLdTOa-xfUfi_MpWRxIUR7jrGFheQ9QQebV94ccu0',
      'https://play-lh.googleusercontent.com/H0qH3pCeo9Y0aXcBfUr76iGao-kR0ko3kE6gdGIjHWYXTAsJ6_QkCWIMw5ZE5c7BrM7L2gl4aETW0av7lAird3Y',
      'https://play-lh.googleusercontent.com/v0UIsFdQ5K6dpnszX-0IzZx_e3-KyCrfzVZThR__eTMSh11hKONrsBxZNTE9gf12kD_Lcs_jBnwgskhYwnGdGA',
      'https://play-lh.googleusercontent.com/FsVmnL47e_eqfOqjOrX6zoUux9hbbPLyHSt4lf3aePJ6Y7e3M0I30sIRZAh49lps2XS4oPRfrOjaQT-yYHJll6c',
      'https://play-lh.googleusercontent.com/agtYwR0xtuP___Ogc9_KDHPG-pwtl43LMqnzWWWXz8IDmFi8Q4c0QK-PX8oCO-ov8zvjObwGcjPtwhtzzqQ5Cww',
      'https://play-lh.googleusercontent.com/iFstqoxDElUVv4T3KxkxP3OTcuFvWF5ZQQjT7aIxy4n2uaVigCCykxeG6EZV9FQ10X1itPj1oORm',
      'https://play-lh.googleusercontent.com/W5DPtvB8Fhmkn5LbFZki_OHL3ZI1Rdc-AFul19UK4f7np2NMjLE5QquD6H0HAeEJ977u3WH4yaQ',
      'https://play-lh.googleusercontent.com/Yq7oyNIvAAkuc69fG51sbAQS4otJxbObbt3xdr8tXxXyUdq4tVGtfgeKuptveGdP1srxaHVrNPzOYcfaEQ',
    ]
  },
  qr: {
    folder: 'public/projects/qr',
    urls: [
      'https://play-lh.googleusercontent.com/_re6mcALPaqotePA0WkgYeOQ6TighHRUS62FRmREPEhyZPdGM3QmRjcSpiMt6Pz1O-WZyvEIy4mtGHj9zw', // icon → main/feature
      'https://play-lh.googleusercontent.com/kR-4ENJtFEIUXBGmyzyrvI0lk9EbDQmVmdhkaDT2HFxi_ejJplJjDnrV2hEevZXjrAht9ZJZhe0McdBPDZki7w',
      'https://play-lh.googleusercontent.com/AURNkSIRtLPAi0fx2Qeq2KGRvovdKDBI2l6Ljpp3MHJOqw2uPjJmAnPQAHyzgW_3cbsNH6cGF8I18N_8peJfaw',
      'https://play-lh.googleusercontent.com/euQKj5dxxrTutQqICWxEEPEoEMUjFodDTyv1nIECkVTpxz-Vza5dcawpZxjFALdc2ZOydEevhvxB1aNo3eJMog',
      'https://play-lh.googleusercontent.com/r1QDbXDfUErMrUSmiC48Tp_gJB7ZF2c1IqGkti_V_EuSJ0tVZa-YZDJPszBw0EXZANZGglYkKsLzJySfkNBUvg',
      'https://play-lh.googleusercontent.com/ukCsznE7xMXmcqGbtI1EiJX6VFQPqMU3zApgXXameC8RqCRJ1LoiuXeZ0dL0UwWEeRvHJ4Yz1u3C0UPrbytdkQ',
      'https://play-lh.googleusercontent.com/mnC8JGmQDhErMAhVUxaLc_qqiMStjqXm47O6Q4Wm_LRghW9ZQdA96Groy2vZmX7L85Avfb3kKV0DFSNI63w8K3A',
      'https://play-lh.googleusercontent.com/_QRhr8QMjI8mwpvtoqF5Flv8Bn1slYg9rIWJlRThUYIeoTmqtsRs-wvnDIph9MOBhb1C0XGX9iwKybPAM0QExg',
      'https://play-lh.googleusercontent.com/XLOUWDh1hxYnuX92PfsUoQ2YgN4oGXL2LxiHkTu9qAr4TXcWN9AbhTIM-i_Vofl9_pVqleofWi2i37RrVHdSnA',
      'https://play-lh.googleusercontent.com/GoCmk_zNOfjnujlny21gQvhcrFl8HddWx_7_25ApvmWc27dMNmQ2DzOh40U_8CplBf0_Zf80PN8dPmRq0Q_n',
    ]
  }
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(`${url}=w1080`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' }
    }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
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

    console.log(`\n📦 Downloading ${appName} (${config.urls.length} images)...`);

    for (let i = 0; i < config.urls.length; i++) {
      const filename = i === 0 ? 'main.png' : `image${i}.png`;
      const dest = path.join(folder, filename);
      try {
        await downloadFile(config.urls[i], dest);
        console.log(`  ✓ ${filename}`);
      } catch (err) {
        console.error(`  ✗ ${filename}: ${err.message}`);
      }
    }
  }
  console.log('\n✅ All downloads complete!');
}

main();
