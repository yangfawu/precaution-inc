import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FetchService {

    private log: { [s: string]: any } = {}

    async get<T>(url: string, type: 'json' | 'blob' | string, overwrite = false): Promise<T> {
        if (url in this.log && this.log[url] !== null && !overwrite)
            return this.log[url]
        let out: T
        const write = (data: T) => {
            this.log[url] = data
            out = data
        }
        await fetch(url)
            .then(res => {
                if (type == 'json')
                    return res.json()
                if (type == 'blob')
                    return res.blob()
                return res
            })
            .then(data => write(data))
            .catch(() => write(null))
        return out
    }

}
