import {
    checkUpdate,
    installUpdate,
    onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { ask } from '@tauri-apps/api/dialog';

const unlisten = await onUpdaterEvent(({ error, status }) => {
    // This will log all updater events, including status updates and errors.
    console.log('Updater event', error, status)
})

export async function update_test() {
    console.log("update_test");
    try {
        // const { shouldUpdate, manifest } = await checkUpdate()
        const { shouldUpdate, manifest } = await checkUpdate()

        if (!manifest) {
            console.log("获取新版本失败，请稍后重试");
        }

        console.log(shouldUpdate, manifest);


        if (shouldUpdate) {
            // You could show a dialog asking the user if they want to install the update here.
            const yes = await ask('是否更新版本', 'Update');

            if (yes) {
                console.log(
                    `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
                )
            }
            // Install the update. This will also restart the app on Windows!
            // await installUpdate()

            // On macOS and Linux you will need to restart the app manually.
            // You could use this step to display another confirmation dialog.
            // await relaunch()
        }
    } catch (error) {
        console.error(error)
    }

}

// you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
// unlisten()

