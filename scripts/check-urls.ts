import { readFileSync } from "fs";

type Job = { title: string; company: string; url: string };

const content = readFileSync("src/data/jobs.ts", "utf-8");
const jobs: Job[] = [];
const re =
  /\{\s*title:\s*"([^"]*)",\s*company:\s*"([^"]*)",\s*location:\s*"([^"]*)",\s*url:\s*"([^"]*)",/g;
let m;
while ((m = re.exec(content)) !== null) {
  jobs.push({ title: m[1], company: m[2], url: m[4] });
}

console.log(`Checking ${jobs.length} job URLs...\n`);

async function main() {
const dead: Job[] = [];

for (const job of jobs) {
  let ok = false;
  try {
    const res = await fetch(job.url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    ok = res.ok;
  } catch {
    try {
      const res2 = await fetch(job.url, {
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });
      ok = res2.ok;
    } catch {
      ok = false;
    }
  }

  if (!ok) {
    console.log(`✗ ${job.company} - ${job.title}`);
    console.log(`  ${job.url}`);
    dead.push(job);
  }
}

console.log(`\n${dead.length} dead / ${jobs.length} total`);
}

main();
