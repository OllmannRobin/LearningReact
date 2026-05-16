import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SelectUserById from './SelectUserById'

describe('SelectUserById', () => {

  it("affiche l'option par défaut", () => {
    render(<SelectUserById />)
    expect(
      screen.getByRole('option', { name: /choisir un utilisateur/i })
    ).toBeInTheDocument()
  })

  it('affiche 3 options au total après chargement', async () => {
    render(<SelectUserById />)

    // On attend qu'Alice soit là, PUIS on compte toutes les options
    await screen.findByRole('option', { name: 'Alice' })
    const options = screen.getAllByRole('option')

    expect(options).toHaveLength(3) // 1 défaut + Alice + Bob
  })

  it('affiche les noms des utilisateurs mockés', async () => {
    render(<SelectUserById />)

    expect(await screen.findByRole('option', { name: 'Alice' })).toBeInTheDocument()
    expect(await screen.findByRole('option', { name: 'Bob' })).toBeInTheDocument()
  })

})