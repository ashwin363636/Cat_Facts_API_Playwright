import { test, expect } from '@playwright/test'
import { getEnvProp } from '../../utils/getEnvValue'

test.describe.parallel('JIRA-XXXX - Test Cat Facts API', () => {
  const baseURL: string = getEnvProp('BASE_URL')

  test('Test Cat /fact API', async ({ request }) => {
    const response = await request.get(baseURL + '/fact', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.fact).toHaveValue
    console.log(body)
  })

  test('Test Cat /facts API', async ({ request }) => {
    const response = await request.get(baseURL + '/facts', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    expect(response.status()).toBeTruthy()
    const body = await response.json()
    expect(body.total).toEqual(332)
    console.log(body)
  })
})
