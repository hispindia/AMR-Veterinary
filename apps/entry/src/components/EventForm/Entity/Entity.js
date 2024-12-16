import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { bool } from 'prop-types'
import { Grid } from '@material-ui/core'
import { CardSection, LoadingSection } from '@hisp-amr/app'
import { EntityButtons } from './EntityButtons'
import { EntityModal } from './EntityModal'
import { EntityInput } from './EntityInput'

/**
 * Entity information section.
 */
export const Entity = ({ showEdit }) => {
    const { person } = useSelector(state => state.metadata)
    const id = useSelector(state => state.data.entity.id)
    const attributes = useSelector(state => state.data.entity.attributes)
    const attributes1 = useSelector(state => state.data.entity)
    // console.log("CCCCCCCCCCCCCCCCCCCCCCCCCc",attributes1)
    // console.log("BBBBBBBBBBBBBBBBB",attributes)
    const editing = useSelector(state => state.data.entity.editing)
    var editableVal = useSelector(state => state.data.editable)
    const programs = useSelector(state => state.metadata.programs)
    var userAccess = false;
    programs.forEach(p => {
        p.programStages.forEach(ps => {
            userAccess = ps.access.data.write
        })
    })

    const [half] = useState(
        Math.floor(person.trackedEntityTypeAttributes.length / 2)
    )

    if (!attributes) return <LoadingSection />

    return (
        <CardSection
            // heading="Person"
            buttons={id && showEdit && userAccess && <EntityButtons />}
        >
            <EntityModal />
            <Grid container spacing={0}>
                <Grid item xs>
                    {attributes.slice(0, half).map(a => (
                        <EntityInput
                            attribute={a}
                            key={a.trackedEntityAttribute.id}
                            userAccess = {userAccess}
                        />
                    ))}
                </Grid>
                <Grid item xs>
                    {attributes.slice(half).map(a => (
                        <EntityInput
                            attribute={a}
                            key={a.trackedEntityAttribute.id}
                            userAccess = {userAccess}

                        />
                    ))}
                </Grid>
            </Grid>
        </CardSection>
    )
}

Entity.prototypes = { showEdit: bool }
