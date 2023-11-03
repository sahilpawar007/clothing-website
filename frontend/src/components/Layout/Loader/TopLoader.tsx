import { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

const TopLoader = () => {
    const [progress, setProgress] = useState(0)

    return (
        <div>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(100)}
            />
        </div>
    )

}

export default TopLoader