import { execaCommand } from 'execa'
const cwd = process.cwd()

async function build() {
    await execaCommand('uni build', { stdio: 'inherit', encoding: 'utf-8', cwd })
    console.info('🎉 编译完成!')
}

build()
